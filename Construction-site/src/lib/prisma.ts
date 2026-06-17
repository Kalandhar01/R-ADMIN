import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { config as loadDotenv, parse as parseDotenv } from "dotenv";

import { ConstructionLead, ConstructionLeadStatusHistory, ContactInquiry, Project, MediaAsset } from "@/models/index.js";

const envCandidates = [
  path.resolve(process.cwd(), ".env"),
  path.resolve(process.cwd(), ".env.local"),
  path.resolve(process.cwd(), "../apps/api/.env"),
  path.resolve(process.cwd(), "../api/.env"),
  path.resolve(process.cwd(), "../../apps/api/.env"),
  path.resolve(process.cwd(), "apps/api/.env"),
];

function mongoUriIsConfigured() {
  return Boolean(process.env.MONGODB_URI?.trim());
}

function loadMongoUriFromEnvFile(envPath: string) {
  if (!existsSync(envPath)) return false;

  loadDotenv({ path: envPath, override: false, quiet: true });
  if (mongoUriIsConfigured()) return true;

  try {
    const parsed = parseDotenv(readFileSync(envPath));
    const mongoUri = parsed.MONGODB_URI?.trim();
    if (!mongoUri) return false;

    process.env.MONGODB_URI = mongoUri;
    return true;
  } catch {
    return false;
  }
}

if (!mongoUriIsConfigured()) {
  for (const envPath of envCandidates) {
    if (loadMongoUriFromEnvFile(envPath)) break;
  }
}

function translateWhere(where: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(where)) {
    if (key === "OR") {
      result.$or = (value as unknown[]).map((v) => translateWhere(v as Record<string, unknown>));
    } else if (key === "AND") {
      result.$and = (value as unknown[]).map((v) => translateWhere(v as Record<string, unknown>));
    } else if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      const mongoOp: Record<string, unknown> = {};
      for (const [op, opVal] of Object.entries(value as Record<string, unknown>)) {
        switch (op) {
          case "not":
            mongoOp.$ne = opVal;
            break;
          case "contains":
            mongoOp.$regex = opVal;
            break;
          case "mode":
            if (opVal === "insensitive") mongoOp.$options = "i";
            break;
          case "gte":
            mongoOp.$gte = opVal;
            break;
          case "lte":
            mongoOp.$lte = opVal;
            break;
          case "gt":
            mongoOp.$gt = opVal;
            break;
          case "lt":
            mongoOp.$lt = opVal;
            break;
          case "in":
            mongoOp.$in = opVal;
            break;
          case "isEmpty":
            if (opVal === false) {
              mongoOp.$not = { $size: 0 };
            }
            break;
          default:
            mongoOp[op] = opVal;
        }
      }
      result[key] = mongoOp;
    } else {
      result[key] = value;
    }
  }
  return result;
}

function translateOrderBy(orderBy: unknown): Record<string, 1 | -1> {
  if (!orderBy) return {};
  if (Array.isArray(orderBy)) {
    const result: Record<string, 1 | -1> = {};
    for (const item of orderBy) {
      const entry = item as Record<string, string>;
      const key = Object.keys(entry)[0];
      result[key] = entry[key] === "asc" ? 1 : -1;
    }
    return result;
  }
  const obj = orderBy as Record<string, string>;
  const key = Object.keys(obj)[0];
  return { [key]: obj[key] === "asc" ? 1 : -1 };
}

function mapDoc(doc: Record<string, unknown> | null): (Record<string, unknown> & { id: string }) | null {
  if (!doc) return null;
  const { _id, __v, ...rest } = doc;
  return { id: String(_id), ...rest };
}

function createSortedStatusHistoryQuery(leadId: string, includeOpts: Record<string, unknown>) {
  const query = ConstructionLeadStatusHistory.find({ leadId }).lean();
  if (includeOpts.orderBy) {
    query.sort(translateOrderBy(includeOpts.orderBy));
  }
  return query;
}

const modelMap: Record<string, { model: any; foreignKey: string }> = {
  mediaAssets: { model: MediaAsset, foreignKey: "projectId" },
};

async function resolveSomeOperators(where: Record<string, unknown>): Promise<Record<string, unknown>> {
  if (!where || typeof where !== "object") return where;
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(where)) {
    if (key === "OR") {
      result.$or = await Promise.all(
        (value as Record<string, unknown>[]).map((v) => resolveSomeOperators(v)),
      );
    } else if (key === "AND") {
      result.$and = await Promise.all(
        (value as Record<string, unknown>[]).map((v) => resolveSomeOperators(v)),
      );
    } else if (value && typeof value === "object" && !Array.isArray(value) && "some" in (value as Record<string, unknown>)) {
      const rel = modelMap[key];
      if (rel) {
        const someCondition = (value as Record<string, unknown>).some as Record<string, unknown>;
        const translated = translateWhere(someCondition);
        const ids = await rel.model.find(translated).distinct(rel.foreignKey);
        if (ids.length > 0) {
          result._id = { $in: ids };
        } else {
          result._id = { $in: [] };
        }
      } else {
        result[key] = value;
      }
    } else {
      result[key] = value;
    }
  }
  return result;
}

async function buildMongoWhere(where: Record<string, unknown>): Promise<Record<string, unknown>> {
  const resolved = await resolveSomeOperators(where || {});
  return translateWhere(resolved);
}

async function handleInclude(
  doc: Record<string, unknown> & { id: string },
  include: Record<string, unknown>,
): Promise<Record<string, unknown> & { id: string }> {
  if (!include) return doc;

  const result = { ...doc };

  if ("statusHistory" in include) {
    const opts = include.statusHistory as Record<string, unknown>;
    const historyDocs = await createSortedStatusHistoryQuery(doc.id, opts);
    result.statusHistory = (historyDocs as Record<string, unknown>[]).map(
      (h: Record<string, unknown>) => mapDoc(h) as Record<string, unknown>,
    );
  }

  return result;
}

async function handleIncludeMany(
  docs: (Record<string, unknown> & { id: string })[],
  include: Record<string, unknown>,
): Promise<(Record<string, unknown> & { id: string })[]> {
  if (!include || Object.keys(include).length === 0) return docs;

  const result = [...docs];

  if ("mediaAssets" in include) {
    const opts = include.mediaAssets as Record<string, unknown>;
    const ids = docs.map((d) => d.id);
    const mediaQuery: Record<string, unknown> = { projectId: { $in: ids } };
    if (opts.where) {
      const translatedWhere = translateWhere(opts.where as Record<string, unknown>);
      Object.assign(mediaQuery, translatedWhere);
    }
    let mediaDocs = await MediaAsset.find(mediaQuery).lean();
    if (opts.orderBy) {
      mediaDocs = mediaDocs.sort((a: any, b: any) => {
        const sortObj = translateOrderBy(opts.orderBy);
        for (const [field, dir] of Object.entries(sortObj)) {
          const aVal = (a as any)[field];
          const bVal = (b as any)[field];
          if (aVal < bVal) return -1 * dir;
          if (aVal > bVal) return 1 * dir;
        }
        return 0;
      });
    }
    const mediaByProjectId: Record<string, Record<string, unknown>[]> = {};
    for (const m of mediaDocs as Record<string, unknown>[]) {
      const pid = String(m.projectId);
      if (!mediaByProjectId[pid]) mediaByProjectId[pid] = [];
      let mapped = mapDoc(m) as Record<string, unknown>;
      if (opts.select) {
        const selected: Record<string, unknown> = {};
        for (const selKey of Object.keys(opts.select as Record<string, unknown>)) {
          if (selKey in mapped) selected[selKey] = mapped[selKey];
        }
        mapped = selected;
      }
      mediaByProjectId[pid].push(mapped);
    }
    for (let i = 0; i < result.length; i++) {
      (result[i] as any).mediaAssets = mediaByProjectId[result[i].id] || [];
    }
  }

  return result;
}

async function handleLeadUpdateInclude(
  doc: Record<string, unknown> & { id: string },
  include: Record<string, unknown>,
): Promise<Record<string, unknown> & { id: string }> {
  if (!include) return doc;
  const result = { ...doc };
  if ("statusHistory" in include) {
    const opts = include.statusHistory as Record<string, unknown>;
    const historyDocs = await createSortedStatusHistoryQuery(doc.id, opts);
    result.statusHistory = (historyDocs as Record<string, unknown>[]).map(
      (h: Record<string, unknown>) => mapDoc(h) as Record<string, unknown>,
    );
  }
  return result;
}

export const prisma = {
  constructionLead: {
    async create({ data }: { data: Record<string, unknown> }) {
      const doc = await ConstructionLead.create(data);
      return mapDoc(doc.toObject()) as any;
    },
    async findUnique({ where, include }: { where: { id: string }; include?: Record<string, unknown> }) {
      const doc = await ConstructionLead.findById(where.id).lean();
      if (!doc) return null;
      let result = mapDoc(doc as Record<string, unknown>) as any;
      if (include) {
        result = await handleInclude(result, include);
      }
      return result;
    },
    async findMany({
      where,
      orderBy,
      skip,
      take,
      select,
    }: {
      where?: Record<string, unknown>;
      orderBy?: Record<string, string> | Record<string, string>[];
      skip?: number;
      take?: number;
      select?: Record<string, unknown>;
    }) {
      const mongoWhere = await buildMongoWhere(where || {});
      let query = ConstructionLead.find(mongoWhere);
      if (orderBy) {
        query = query.sort(translateOrderBy(orderBy));
      }
      if (skip) {
        query = query.skip(skip);
      }
      if (take) {
        query = query.limit(take);
      }
      if (select) {
        const selectStr = Object.keys(select).join(" ");
        query = query.select(selectStr);
      }
      const docs = (await query.lean()) as any[];
      return docs.map((d) => mapDoc(d) as any);
    },
    async count(args?: { where?: Record<string, unknown> }) {
      const mongoWhere = await buildMongoWhere(args?.where || {});
      return ConstructionLead.countDocuments(mongoWhere);
    },
    async update({
      where,
      data,
      include,
    }: {
      where: { id: string };
      data: Record<string, unknown>;
      include?: Record<string, unknown>;
    }) {
      const { statusHistory, ...updateData } = data;

      if (statusHistory && (statusHistory as Record<string, unknown>).create) {
        const createData = (statusHistory as Record<string, unknown>).create as Record<string, unknown>;
        await ConstructionLeadStatusHistory.create({
          leadId: where.id,
          ...createData,
        });
      }

      const doc = await ConstructionLead.findByIdAndUpdate(where.id, updateData, { new: true }).lean();
      if (!doc) return null;

      let result = mapDoc(doc as Record<string, unknown>) as any;
      if (include) {
        result = await handleLeadUpdateInclude(result, include);
      }
      return result;
    },
  },
  contactInquiry: {
    async create({ data }: { data: Record<string, unknown> }) {
      const doc = await ContactInquiry.create(data);
      return mapDoc(doc.toObject()) as any;
    },
  },
  project: {
    async findMany({
      where,
      orderBy,
      take,
      include,
    }: {
      where?: Record<string, unknown>;
      orderBy?: Record<string, string> | Record<string, string>[];
      take?: number;
      include?: Record<string, unknown>;
    }) {
      const mongoWhere = await buildMongoWhere(where || {});
      let query = Project.find(mongoWhere);
      if (orderBy) {
        query = query.sort(translateOrderBy(orderBy));
      }
      if (take) {
        query = query.limit(take);
      }
      const docs = (await query.lean()) as any[];

      let mapped = docs.map((d) => mapDoc(d) as any);

      if (include) {
        mapped = await handleIncludeMany(mapped, include);
      }

      return mapped;
    },
  },
};

export function getPrismaClient() {
  return prisma;
}

if (process.env.NODE_ENV !== "production") {
  (globalThis as unknown as Record<string, unknown>).ractyshConstructionPrisma = prisma;
}

import path from "node:path";
import { readFileSync } from "node:fs";
import { config as loadDotenv, parse as parseDotenv } from "dotenv";
import "./db.js";
import NewsletterSubscriber from "../models/NewsletterSubscriber.js";
import Admin from "../models/Admin.js";
import Notification from "../models/Notification.js";

const envCandidates = [
  path.resolve(process.cwd(), ".env"),
  path.resolve(process.cwd(), "../apps/api/.env"),
  path.resolve(process.cwd(), "../api/.env"),
  path.resolve(process.cwd(), "../../apps/api/.env"),
  path.resolve(process.cwd(), "apps/api/.env"),
];

function mongodbUriIsConfigured() {
  return Boolean(process.env.MONGODB_URI?.trim());
}

function loadMongodbUriFromEnvFile(envPath: string) {
  loadDotenv({ path: envPath, override: false });
  if (mongodbUriIsConfigured()) return true;

  try {
    const parsed = parseDotenv(readFileSync(envPath));
    const mongodbUri = parsed.MONGODB_URI?.trim();
    if (!mongodbUri) return false;

    process.env.MONGODB_URI = mongodbUri;
    return true;
  } catch {
    return false;
  }
}

if (!mongodbUriIsConfigured()) {
  for (const envPath of envCandidates) {
    if (loadMongodbUriFromEnvFile(envPath)) break;
  }
}

const prisma = {
  newsletterSubscriber: {
    findUnique: async ({ where }: { where: { email?: string; id?: string } }) => {
      const query: Record<string, unknown> = {};
      if (where.email) query.email = where.email;
      if (where.id) query._id = where.id;
      return NewsletterSubscriber.findOne(query).lean() as unknown as Record<string, unknown> | null;
    },
    create: async ({ data }: { data: Record<string, unknown> }) => {
      const doc = await NewsletterSubscriber.create(data);
      return doc.toObject() as unknown as Record<string, unknown>;
    },
    findMany: async (_args?: Record<string, unknown>) => {
      return [];
    },
  },
  admin: {
    findMany: async ({
      where,
      select,
    }: {
      where?: Record<string, unknown>;
      select?: Record<string, unknown>;
    }) => {
      const selectStr = select ? Object.keys(select as Record<string, 1>).join(" ") : "";
      return Admin.find(where || {}).select(selectStr).lean() as unknown as Record<string, unknown>[];
    },
  },
  notification: {
    createMany: async ({
      data,
      skipDuplicates,
    }: {
      data: Record<string, unknown>[];
      skipDuplicates?: boolean;
    }) => {
      for (const item of data) {
        try {
          await Notification.create(item);
        } catch (e: unknown) {
          if (
            skipDuplicates &&
            e &&
            typeof e === "object" &&
            "code" in e &&
            (e as { code: number }).code === 11000
          )
            continue;
          throw e;
        }
      }
    },
  },
};

export function getPrismaClient() {
  return prisma;
}
export { prisma };

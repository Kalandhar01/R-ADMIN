import "dotenv/config";
import mongoose from "mongoose";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function migrate() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error("MONGODB_URI is not set.");
    process.exit(1);
  }

  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB.");

  // Import models
  const { BlogModel } = await import("../src/models/Blog.js");
  const { NewsletterModel, SubscriberModel, NewsletterSubscriberModel } = await import("../src/models/Newsletter.js");
  const { ContactInquiryModel, GeneralSubscriberModel, ContactInfoModel } = await import("../src/models/ContactInquiry.js");
  const { ConsultationModel, WorkflowStageModel, WorkflowLogModel, UploadedDocumentModel, StatusHistoryModel } = await import("../src/models/Consultation.js");
  const { IngestionEventModel, LeadModel, IngestedProjectModel, IngestedDocumentModel, IngestedMediaModel, ChatbotQueryModel, ServiceRequestModel, SubscriptionModel } = await import("../src/models/Ingestion.js");
  const { AdminModel, RoleModel, AuditLogModel, SettingsModel, NotificationModel } = await import("../src/models/Admin.js");
  const { SiteConfigModel, NavItemModel, HeroSectionModel, PageSectionModel, BlogPostModel, BlogCommentModel } = await import("../src/models/Content.js");
  const { CompanyDivisionModel, DomainMappingModel, ServiceOfferModel, ProjectModel, MediaAssetModel, TeamMemberModel, CareerJobModel, CareerApplicationModel, StatisticModel, TestimonialModel, LocationModel, LegalDocumentModel, CertificationModel, TimelineEventModel, PartnerModel } = await import("../src/models/Business.js");
  const { RactyshGroupModel, ArchitectureModel, ConstructionModel, OtcExchangeModel, RealEstateModel, ImportExportModel } = await import("../src/models/BusinessCollections.js");

  const results: Record<string, { prisma: number; mongodb: number }> = {};
  let success = true;

  async function migrateModel<T>(
    name: string,
    prismaQuery: () => Promise<T[]>,
    mongoModel: mongoose.Model<any>,
    transform: (item: T) => Record<string, unknown>
  ) {
    process.stdout.write(`Migrating ${name}... `);
    try {
      const prismaRecords = await prismaQuery();
      if (prismaRecords.length === 0) {
        console.log("0 records (skipping)");
        return;
      }
      const transformed = prismaRecords.map(transform);
      await mongoModel.deleteMany({});
      const inserted = await mongoModel.insertMany(transformed, { ordered: false });
      results[name] = { prisma: prismaRecords.length, mongodb: inserted.length };
      console.log(`${inserted.length} records migrated`);
    } catch (error) {
      success = false;
      console.error(`FAILED:`, error instanceof Error ? error.message : error);
    }
  }

  // Migrate Blogs
  await migrateModel("Blog", () => prisma.blog.findMany(), BlogModel, (b: any) => ({
    division: b.division || "ractysh-group",
    title: b.title,
    slug: b.slug,
    excerpt: b.excerpt,
    content: b.content,
    coverImage: b.coverImage || "",
    coverImageAlt: b.coverImageAlt,
    imageMetadata: b.imageMetadata,
    author: b.author,
    category: b.category,
    tags: b.tags || [],
    featured: b.featured || false,
    status: b.status || "draft",
    publishedAt: b.publishedAt,
    readTime: b.readTime,
    seoTitle: b.seoTitle,
    seoDescription: b.seoDescription,
    canonicalUrl: b.canonicalUrl,
    views: b.views || 0,
    likes: b.likes || 0,
    relatedSlugs: b.relatedSlugs || [],
    aiGenerated: b.aiGenerated || false,
    aiPrompt: b.aiPrompt,
    newsletterId: b.newsletterId,
    createdAt: b.createdAt,
    updatedAt: b.updatedAt
  }));

  // Migrate Newsletters
  await migrateModel("Newsletter", () => prisma.newsletter.findMany(), NewsletterModel, (n: any) => ({
    division: n.division || "ractysh-group",
    title: n.title,
    slug: n.slug,
    excerpt: n.excerpt,
    content: n.content,
    coverImage: n.coverImage || "",
    category: n.category,
    author: n.author,
    featured: n.featured || false,
    status: n.status || "draft",
    publishDate: n.publishDate,
    tags: n.tags || [],
    readTime: n.readTime,
    views: n.views || 0,
    createdAt: n.createdAt,
    updatedAt: n.updatedAt
  }));

  // Migrate Subscribers
  await migrateModel("Subscriber", () => prisma.subscriber.findMany(), SubscriberModel, (s: any) => ({
    email: s.email,
    division: s.division || "ractysh-group",
    status: s.status || "active",
    source: s.source || "executive-intelligence-center",
    createdAt: s.createdAt,
    updatedAt: s.updatedAt
  }));

  // Migrate NewsletterSubscribers
  await migrateModel("NewsletterSubscriber", () => prisma.newsletterSubscriber.findMany(), NewsletterSubscriberModel, (s: any) => ({
    email: s.email,
    division: s.division || "ractysh-group",
    createdAt: s.createdAt
  }));

  // Migrate ContactInquiries
  await migrateModel("ContactInquiry", () => prisma.contactInquiry.findMany(), ContactInquiryModel, (c: any) => ({
    division: c.division || "ractysh-group",
    name: c.name,
    email: c.email,
    phone: c.phone,
    company: c.company,
    service: c.service,
    subject: c.subject,
    message: c.message,
    sourcePage: c.sourcePage,
    status: c.status || "new",
    notes: c.notes,
    createdAt: c.createdAt,
    updatedAt: c.updatedAt
  }));

  // Migrate SiteConfig
  await migrateModel("SiteConfig", () => prisma.siteConfig.findMany(), SiteConfigModel, (s: any) => ({
    key: s.key || "default",
    division: s.division || "ractysh-group",
    logoText: s.logoText || "Ractysh",
    seoTitle: s.seoTitle,
    seoDescription: s.seoDescription,
    seoKeywords: s.seoKeywords || [],
    themeMode: s.themeMode || "light",
    themeAccent: s.themeAccent || "#8b1118",
    footerHeadline: s.footerHeadline,
    footerDescription: s.footerDescription,
    footerLinks: s.footerLinks || [],
    socialLinks: s.socialLinks || [],
    popupConfig: s.popupConfig,
    googleRatings: s.googleRatings,
    feedbackConfig: s.feedbackConfig,
    createdAt: s.createdAt,
    updatedAt: s.updatedAt
  }));

  // Migrate CompanyDivisions
  await migrateModel("CompanyDivision", () => prisma.companyDivision.findMany(), CompanyDivisionModel, (c: any) => ({
    slug: c.slug,
    name: c.name,
    legalName: c.legalName,
    summary: c.summary,
    description: c.description,
    metric: c.metric,
    registrationNo: c.registrationNo,
    foundedYear: c.foundedYear,
    website: c.website,
    brandColor: c.brandColor || "#8b1118",
    accentColor: c.accentColor || "#d6b45f",
    status: c.status || "active",
    position: c.position || 0,
    createdAt: c.createdAt,
    updatedAt: c.updatedAt
  }));

  // Migrate DomainMappings
  await migrateModel("DomainMapping", () => prisma.domainMapping.findMany(), DomainMappingModel, (d: any) => ({
    domain: d.domain,
    division: d.division,
    status: d.status || "active",
    primary: d.primary || false,
    notes: d.notes,
    createdAt: d.createdAt,
    updatedAt: d.updatedAt
  }));

  // Migrate Admins
  await migrateModel("Admin", () => prisma.admin.findMany(), AdminModel, (a: any) => ({
    email: a.email,
    name: a.name,
    imageUrl: a.imageUrl,
    passwordHash: a.passwordHash,
    googleId: a.googleId,
    active: a.active !== false,
    lastLoginAt: a.lastLoginAt,
    createdAt: a.createdAt,
    updatedAt: a.updatedAt
  }));

  // Migrate Roles
  await migrateModel("Role", () => prisma.role.findMany(), RoleModel, (r: any) => ({
    name: r.name,
    description: r.description,
    permissions: r.permissions || [],
    createdAt: r.createdAt,
    updatedAt: r.updatedAt
  }));

  // Migrate AuditLogs
  await migrateModel("AuditLog", () => prisma.auditLog.findMany(), AuditLogModel, (a: any) => ({
    action: a.action,
    entity: a.entity,
    entityId: a.entityId,
    summary: a.summary,
    metadata: a.metadata,
    ipAddress: a.ipAddress,
    userAgent: a.userAgent,
    createdAt: a.createdAt
  }));

  // Migrate ServiceOffers
  await migrateModel("ServiceOffer", () => prisma.serviceOffer.findMany(), ServiceOfferModel, (s: any) => ({
    division: s.division || "ractysh-group",
    slug: s.slug,
    title: s.title,
    summary: s.summary,
    description: s.description,
    category: s.category,
    href: s.href,
    imageUrl: s.imageUrl,
    heroContent: s.heroContent || {},
    metrics: s.metrics || [],
    images: s.images || [],
    sections: s.sections || [],
    cta: s.cta || {},
    seo: s.seo || {},
    tags: s.tags || [],
    status: s.status || "published",
    position: s.position || 0,
    createdAt: s.createdAt,
    updatedAt: s.updatedAt
  }));

  // Migrate Projects
  await migrateModel("Project", () => prisma.project.findMany(), ProjectModel, (p: any) => ({
    division: p.division || "ractysh-group",
    slug: p.slug,
    title: p.title,
    category: p.category,
    location: p.location,
    summary: p.summary,
    description: p.description,
    year: p.year,
    status: p.status || "concept",
    clientName: p.clientName,
    imageUrl: p.imageUrl,
    featured: p.featured || false,
    position: p.position || 0,
    metadata: p.metadata || {},
    startedAt: p.startedAt,
    completedAt: p.completedAt,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt
  }));

  // Migrate TeamMembers
  await migrateModel("TeamMember", () => prisma.teamMember.findMany(), TeamMemberModel, (t: any) => ({
    division: t.division || "ractysh-group",
    slug: t.slug,
    name: t.name,
    role: t.role,
    position: t.position,
    biography: t.biography,
    leadershipStatement: t.leadershipStatement,
    imageUrl: t.imageUrl,
    email: t.email,
    phone: t.phone,
    socialLinks: t.socialLinks || [],
    achievements: t.achievements || [],
    awards: t.awards || [],
    gallery: t.gallery || [],
    isFounder: t.isFounder || false,
    isDirector: t.isDirector || false,
    positionOrder: t.positionOrder || 0,
    createdAt: t.createdAt,
    updatedAt: t.updatedAt
  }));

  // Migrate CareerJobs
  await migrateModel("CareerJob", () => prisma.careerJob.findMany(), CareerJobModel, (c: any) => ({
    division: c.division || "ractysh-group",
    slug: c.slug,
    title: c.title,
    location: c.location,
    type: c.type,
    summary: c.summary,
    description: c.description,
    status: c.status || "published",
    createdAt: c.createdAt,
    updatedAt: c.updatedAt
  }));

  // Migrate CareerApplications
  await migrateModel("CareerApplication", () => prisma.careerApplication.findMany(), CareerApplicationModel, (c: any) => ({
    division: c.division || "ractysh-group",
    fullName: c.fullName,
    email: c.email,
    phone: c.phone,
    position: c.position,
    experience: c.experience,
    message: c.message,
    resumeUrl: c.resumeUrl,
    portfolioUrl: c.portfolioUrl,
    coverLetter: c.coverLetter,
    status: c.status || "new",
    notes: c.notes,
    createdAt: c.createdAt,
    updatedAt: c.updatedAt
  }));

  // Migrate Consultations
  await migrateModel("Consultation", () => prisma.consultation.findMany(), ConsultationModel, (c: any) => ({
    trackingToken: c.trackingToken,
    division: c.division || "ractysh-group",
    fullName: c.fullName,
    companyName: c.companyName,
    emailAddress: c.emailAddress,
    phoneNumber: c.phoneNumber,
    serviceType: c.serviceType,
    budgetRange: c.budgetRange,
    projectTimeline: c.projectTimeline,
    projectDescription: c.projectDescription,
    preferredConsultationType: c.preferredConsultationType,
    source: c.source || "book-consultation-page",
    status: c.status || "new",
    currentStageKey: c.currentStageKey || "internal_review",
    notificationSent: c.notificationSent || false,
    notificationSkipped: c.notificationSkipped || false,
    notificationError: c.notificationError,
    notificationSentAt: c.notificationSentAt,
    createdAt: c.createdAt,
    updatedAt: c.updatedAt
  }));

  // Migrate IngestionEvents
  await migrateModel("IngestionEvent", () => prisma.ingestionEvent.findMany(), IngestionEventModel, (e: any) => ({
    sourceType: e.sourceType,
    entityType: e.entityType,
    status: e.status || "received",
    priority: e.priority || "high",
    source: e.source,
    division: e.division || "ractysh-group",
    service: e.service,
    location: e.location,
    entityId: e.entityId,
    entityModel: e.entityModel,
    payload: e.payload || {},
    aiSummary: e.aiSummary,
    errorMessage: e.errorMessage,
    startedAt: e.startedAt,
    processedAt: e.processedAt,
    createdAt: e.createdAt,
    updatedAt: e.updatedAt
  }));

  // Migrate Leads
  await migrateModel("Lead", () => prisma.lead.findMany(), LeadModel, (l: any) => ({
    division: l.division || "ractysh-group",
    fullName: l.fullName,
    email: l.email,
    phone: l.phone,
    companyName: l.companyName,
    source: l.source,
    sourceType: l.sourceType || "website_contact_form",
    service: l.service,
    location: l.location,
    status: l.status || "new",
    message: l.message,
    aiSummary: l.aiSummary,
    metadata: l.metadata,
    createdAt: l.createdAt,
    updatedAt: l.updatedAt
  }));

  // Migrate IngestedProjects
  await migrateModel("IngestedProject", () => prisma.ingestedProject.findMany(), IngestedProjectModel, (p: any) => ({
    title: p.title,
    division: p.division || "ractysh-group",
    status: p.status || "active",
    progress: p.progress || 0,
    owner: p.owner,
    dueDate: p.dueDate,
    priority: p.priority || "high",
    budget: p.budget ? Number(p.budget) : null,
    location: p.location,
    summary: p.summary,
    aiSummary: p.aiSummary,
    metadata: p.metadata,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt
  }));

  // Migrate IngestedDocuments
  await migrateModel("IngestedDocument", () => prisma.ingestedDocument.findMany(), IngestedDocumentModel, (d: any) => ({
    division: d.division || "ractysh-group",
    filename: d.filename,
    mimeType: d.mimeType,
    size: d.size,
    url: d.url,
    provider: d.provider || "metadata",
    providerId: d.providerId,
    category: d.category,
    projectId: d.projectId,
    projectName: d.projectName,
    uploadedBy: d.uploadedBy || "admin",
    uploadDate: d.uploadDate,
    aiSummary: d.aiSummary,
    metadata: d.metadata,
    createdAt: d.createdAt,
    updatedAt: d.updatedAt
  }));

  // Migrate IngestedMedia
  await migrateModel("IngestedMedia", () => prisma.ingestedMedia.findMany(), IngestedMediaModel, (m: any) => ({
    division: m.division || "ractysh-group",
    kind: m.kind || "image",
    title: m.title,
    altText: m.altText,
    url: m.url,
    category: m.category,
    tags: m.tags || [],
    projectId: m.projectId,
    metadata: m.metadata,
    aiDescription: m.aiDescription,
    createdAt: m.createdAt,
    updatedAt: m.updatedAt
  }));

  // Migrate MediaAssets
  await migrateModel("MediaAsset", () => prisma.mediaAsset.findMany(), MediaAssetModel, (m: any) => ({
    kind: m.kind || "image",
    title: m.title,
    altText: m.altText,
    url: m.url,
    provider: m.provider || "local",
    providerId: m.providerId,
    mimeType: m.mimeType,
    size: m.size,
    width: m.width,
    height: m.height,
    metadata: m.metadata,
    division: m.division || "ractysh-group",
    createdAt: m.createdAt,
    updatedAt: m.updatedAt
  }));

  // Migrate Settings
  await migrateModel("Settings", () => prisma.settings.findMany(), SettingsModel, (s: any) => ({
    key: s.key,
    label: s.label,
    scope: s.scope || "global",
    division: s.division || "ractysh-group",
    value: s.value || {},
    createdAt: s.createdAt,
    updatedAt: s.updatedAt
  }));

  // Migrate Notifications
  await migrateModel("Notification", () => prisma.notification.findMany(), NotificationModel, (n: any) => ({
    dedupeKey: n.dedupeKey,
    title: n.title,
    message: n.message,
    project: n.project || "group",
    division: n.division || "ractysh-group",
    priority: n.priority || "medium",
    status: n.status || "unread",
    entity: n.entity,
    entityId: n.entityId,
    actionUrl: n.actionUrl,
    metadata: n.metadata,
    readAt: n.readAt,
    archivedAt: n.archivedAt,
    createdAt: n.createdAt,
    updatedAt: n.updatedAt
  }));

  // Migrate BlogPosts
  await migrateModel("BlogPost", () => prisma.blogPost.findMany(), BlogPostModel, (b: any) => ({
    division: b.division || "ractysh-group",
    slug: b.slug,
    title: b.title,
    category: b.category,
    excerpt: b.excerpt,
    body: b.body,
    imageUrl: b.imageUrl,
    readingTime: b.readingTime,
    tags: b.tags || [],
    status: b.status || "draft",
    publishedAt: b.publishedAt,
    createdAt: b.createdAt,
    updatedAt: b.updatedAt
  }));

  // Migrate Statistics
  await migrateModel("Statistic", () => prisma.statistic.findMany(), StatisticModel, (s: any) => ({
    division: s.division || "ractysh-group",
    scope: s.scope || "global",
    label: s.label,
    value: s.value,
    suffix: s.suffix || "",
    position: s.position || 0,
    createdAt: s.createdAt,
    updatedAt: s.updatedAt
  }));

  // Migrate Testimonials
  await migrateModel("Testimonial", () => prisma.testimonial.findMany(), TestimonialModel, (t: any) => ({
    division: t.division || "ractysh-group",
    quote: t.quote,
    name: t.name,
    role: t.role,
    companyName: t.companyName,
    rating: t.rating,
    approved: t.approved || false,
    source: t.source,
    position: t.position || 0,
    createdAt: t.createdAt,
    updatedAt: t.updatedAt
  }));

  // Migrate Locations
  await migrateModel("Location", () => prisma.location.findMany(), LocationModel, (l: any) => ({
    division: l.division || "ractysh-group",
    name: l.name,
    address: l.address,
    outlookLocation: l.outlookLocation,
    city: l.city,
    state: l.state,
    country: l.country || "India",
    postalCode: l.postalCode,
    phone: l.phone,
    email: l.email,
    hours: l.hours,
    mapEmbedUrl: l.mapEmbedUrl,
    position: l.position || 0,
    active: l.active !== false,
    createdAt: l.createdAt,
    updatedAt: l.updatedAt
  }));

  // Migrate LegalDocuments
  await migrateModel("LegalDocument", () => prisma.legalDocument.findMany(), LegalDocumentModel, (l: any) => ({
    slug: l.slug,
    title: l.title,
    summary: l.summary,
    body: l.body,
    fileUrl: l.fileUrl,
    effectiveAt: l.effectiveAt,
    createdAt: l.createdAt,
    updatedAt: l.updatedAt
  }));

  // Migrate Certifications
  await migrateModel("Certification", () => prisma.certification.findMany(), CertificationModel, (c: any) => ({
    division: c.division || "ractysh-group",
    title: c.title,
    issuer: c.issuer,
    year: c.year,
    fileUrl: c.fileUrl,
    createdAt: c.createdAt,
    updatedAt: c.updatedAt
  }));

  // Migrate TimelineEvents
  await migrateModel("TimelineEvent", () => prisma.timelineEvent.findMany(), TimelineEventModel, (t: any) => ({
    division: t.division || "ractysh-group",
    year: t.year,
    title: t.title,
    description: t.description,
    position: t.position || 0,
    createdAt: t.createdAt,
    updatedAt: t.updatedAt
  }));

  // Migrate Partners
  await migrateModel("Partner", () => prisma.partner.findMany(), PartnerModel, (p: any) => ({
    name: p.name,
    description: p.description,
    website: p.website,
    logoUrl: p.logoUrl,
    position: p.position || 0,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt
  }));

  // Migrate ChatbotQueries
  await migrateModel("ChatbotQuery", () => prisma.chatbotQuery.findMany(), ChatbotQueryModel, (c: any) => ({
    question: c.question,
    answer: c.answer,
    pageUrl: c.pageUrl,
    createdAt: c.createdAt
  }));

  // Migrate ServiceRequests
  await migrateModel("ServiceRequest", () => prisma.serviceRequest.findMany(), ServiceRequestModel, (s: any) => ({
    division: s.division || "ractysh-group",
    name: s.name,
    email: s.email,
    service: s.service,
    route: s.route,
    createdAt: s.createdAt
  }));

  // Migrate Subscriptions
  await migrateModel("Subscription", () => prisma.subscription.findMany(), SubscriptionModel, (s: any) => ({
    email: s.email,
    source: s.source || "website",
    status: s.status || "active",
    consentAt: s.consentAt,
    unsubscribedAt: s.unsubscribedAt,
    createdAt: s.createdAt,
    updatedAt: s.updatedAt
  }));

  await mongoose.disconnect();
  await prisma.$disconnect();

  console.log("\n=== MIGRATION COMPLETE ===");
  console.log(JSON.stringify(results, null, 2));
  console.log(success ? "\nAll migrations completed successfully!" : "\nSome migrations had errors. Check the output above.");
  process.exit(success ? 0 : 1);
}

migrate().catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
});

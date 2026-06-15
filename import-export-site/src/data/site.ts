export const heroSlides = [
  {
    src: "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&w=2600&q=88",
    alt: "Container vessel moving through international shipping lane",
    label: "Ocean Freight",
  },
  {
    src: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=2600&q=88",
    alt: "Global port terminal with stacked containers and cranes",
    label: "Port Operations",
  },
  {
    src: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2600&q=88",
    alt: "Commercial cargo aircraft flying above clouds",
    label: "Air Freight",
  },
  {
    src: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&w=2600&q=88",
    alt: "Modern logistics warehouse with organized freight handling",
    label: "Warehousing",
  },
];

export const featuredServices = [
  {
    title: "Import Services",
    slug: "import-services",
    desc: "End-to-end import management from supplier coordination to customs clearance and last-mile delivery.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Export Services",
    slug: "export-services",
    desc: "Comprehensive export solutions including documentation, compliance, and international market access.",
    image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Global Sourcing",
    slug: "global-sourcing",
    desc: "Strategic supplier identification, vendor verification, and procurement across global markets.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Customs Clearance",
    slug: "customs-clearance",
    desc: "Expert customs brokerage, HS code classification, duty optimization, and regulatory compliance.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Freight Forwarding",
    slug: "freight-forwarding",
    desc: "Multi-modal freight solutions spanning ocean, air, and road with real-time tracking visibility.",
    image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Supply Chain Management",
    slug: "supply-chain",
    desc: "Integrated supply chain orchestration from procurement to final delivery with control tower oversight.",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=85",
  },
];

export const allServices = [
  { title: "Import Services", slug: "import-services", category: "Core" },
  { title: "Export Services", slug: "export-services", category: "Core" },
  { title: "Global Product Sourcing", slug: "global-sourcing", category: "Sourcing" },
  { title: "International Procurement", slug: "procurement", category: "Sourcing" },
  { title: "Freight Forwarding", slug: "freight-forwarding", category: "Freight" },
  { title: "Air Freight", slug: "air-freight", category: "Freight" },
  { title: "Sea Freight", slug: "sea-freight", category: "Freight" },
  { title: "Road Transportation", slug: "road-transportation", category: "Freight" },
  { title: "Customs Clearance", slug: "customs-clearance", category: "Compliance" },
  { title: "Warehousing", slug: "warehousing", category: "Logistics" },
  { title: "Inventory Management", slug: "inventory-management", category: "Logistics" },
  { title: "Supply Chain Solutions", slug: "supply-chain-solutions", category: "Advisory" },
  { title: "Distribution Services", slug: "distribution", category: "Logistics" },
  { title: "Trade Documentation", slug: "trade-documentation", category: "Compliance" },
  { title: "Import Compliance", slug: "import-compliance", category: "Compliance" },
  { title: "Export Compliance", slug: "export-compliance", category: "Compliance" },
  { title: "Cargo Insurance", slug: "cargo-insurance", category: "Risk" },
  { title: "Vendor Management", slug: "vendor-management", category: "Sourcing" },
  { title: "Quality Inspection", slug: "quality-inspection", category: "Sourcing" },
  { title: "Market Entry Support", slug: "market-entry", category: "Advisory" },
  { title: "Cross-Border Logistics", slug: "cross-border", category: "Logistics" },
  { title: "Project Cargo Handling", slug: "project-cargo", category: "Freight" },
  { title: "Container Logistics", slug: "container-logistics", category: "Logistics" },
  { title: "Trade Consulting", slug: "trade-consulting", category: "Advisory" },
  { title: "International Business Support", slug: "international-support", category: "Advisory" },
];

export const servicesDetail: Record<string, { desc: string; features: string[] }> = {
  "import-services": {
    desc: "Full-service import management covering supplier coordination, international procurement, documentation, customs clearance, and domestic delivery. We handle every touchpoint so your goods move without friction.",
    features: ["Supplier verification & onboarding", "Incoterms negotiation", "Documentation management", "Customs brokerage", "Duty & tax optimization", "Last-mile delivery"],
  },
  "export-services": {
    desc: "Take your products global with confidence. Our export services handle compliance documentation, international buyer coordination, shipping logistics, and market-specific regulatory requirements.",
    features: ["Export documentation", "International buyer matching", "Certificate of origin processing", "Regulatory compliance", "Shipping consolidation", "Market research"],
  },
  "global-sourcing": {
    desc: "Identify, evaluate, and onboard suppliers across global markets. Our sourcing team combines local market intelligence with rigorous quality standards to find the right partners for your business.",
    features: ["Supplier identification", "Factory audits", "Price negotiation", "Quality assurance", "Sample management", "Contract manufacturing"],
  },
  "procurement": {
    desc: "Strategic international procurement services that optimize cost, quality, and delivery timelines across complex global supply chains.",
    features: ["Strategic sourcing", "Vendor management", "Contract negotiation", "Supply risk analysis", "Cost optimization", "Category management"],
  },
  "freight-forwarding": {
    desc: "Multi-modal freight forwarding with real-time visibility. Whether ocean, air, or road, we coordinate every leg of the journey with proactive exception management.",
    features: ["Multi-modal coordination", "Rate negotiation", "Route optimization", "Real-time tracking", "Documentation", "Insurance coordination"],
  },
  "air-freight": {
    desc: "Time-critical air freight solutions with priority boarding, express handling, and door-to-door tracking for urgent and high-value shipments.",
    features: ["Express & economy options", "Airport handling", "Customs pre-clearance", "Dangerous goods handling", "Temperature-controlled", "Charter services"],
  },
  "sea-freight": {
    desc: "Comprehensive ocean freight solutions including FCL, LCL, breakbulk, and project cargo with port-to-port and door-to-door service options.",
    features: ["FCL / LCL consolidation", "Breakbulk cargo", "Reefer containers", "Port handling", "Bill of lading management", "Demurrage prevention"],
  },
  "road-transportation": {
    desc: "Cross-border and domestic road transportation with real-time GPS tracking, temperature monitoring, and secure cargo handling for all freight types.",
    features: ["Cross-border trucking", "FTL / LTL options", "GPS tracking", "Temperature monitoring", "Secure cargo handling", "Customs bond transit"],
  },
  "customs-clearance": {
    desc: "Expert customs brokerage ensuring compliant, efficient clearance for imports and exports across all major trade corridors.",
    features: ["HS code classification", "Duty calculation", "Permit management", "Bonded warehouse", "Post-clearance audit", "Trade agreement utilization"],
  },
  "warehousing": {
    desc: "Strategic warehousing solutions including bonded storage, inventory management, fulfillment, and distribution across key logistics hubs.",
    features: ["Bonded warehousing", "Inventory management", "Pick & pack", "Cross-docking", "Temperature-controlled storage", "Distribution"],
  },
  "inventory-management": {
    desc: "Real-time inventory visibility and management systems that reduce carrying costs while ensuring stock availability across your supply chain.",
    features: ["Real-time tracking", "Demand forecasting", "Stock optimization", "Multi-warehouse sync", "Automated replenishment", "Reporting dashboards"],
  },
  "supply-chain-solutions": {
    desc: "End-to-end supply chain design and management services that optimize cost, speed, and reliability across your entire global network.",
    features: ["Supply chain design", "Control tower setup", "Performance monitoring", "Cost optimization", "Risk management", "Sustainability planning"],
  },
  "distribution": {
    desc: "Integrated distribution services from regional hubs to final delivery points, ensuring efficient last-mile logistics across domestic and cross-border markets.",
    features: ["Regional distribution", "Last-mile delivery", "Route optimization", "Fleet management", "Returns processing", "Multi-channel fulfillment"],
  },
  "trade-documentation": {
    desc: "Complete trade documentation services ensuring every shipment has accurate, compliant paperwork from purchase order to proof of delivery.",
    features: ["Letter of credit handling", "Bill of lading", "Certificate of origin", "Packing lists", "Commercial invoices", "Insurance certificates"],
  },
  "import-compliance": {
    desc: "Stay compliant with import regulations across markets. Our experts manage classifications, valuations, and regulatory requirements for smooth clearance.",
    features: ["Regulatory mapping", "Risk assessment", "Audit support", "License management", "Product registration", "Sanctions screening"],
  },
  "export-compliance": {
    desc: "Navigate export controls and sanctions regimes with confidence. Comprehensive compliance services for dual-use goods, controlled technologies, and regulated products.",
    features: ["Export controls classification", "Dual-use goods", "Sanctions screening", "License applications", "End-use verification", "Record keeping"],
  },
  "cargo-insurance": {
    desc: "Comprehensive cargo insurance solutions protecting your goods throughout the supply chain with competitive rates and fast claims processing.",
    features: ["All-risk coverage", "Total loss protection", "War & strike risk", "Warehouse-to-warehouse", "Claims management", "Risk assessment"],
  },
  "vendor-management": {
    desc: "Strategic vendor management programs that ensure supplier reliability, quality consistency, and continuous improvement across your supply base.",
    features: ["Vendor qualification", "Performance scoring", "Audit programs", "Corrective action", "Relationship management", "Supplier development"],
  },
  "quality-inspection": {
    desc: "Independent quality inspection services at every stage of production and shipping to ensure products meet specifications before they leave the factory.",
    features: ["Pre-shipment inspection", "During production", "Container loading supervision", "Laboratory testing", "Factory audits", "Product certification"],
  },
  "market-entry": {
    desc: "Strategic market entry support for businesses expanding into new international markets, including regulatory research, partner identification, and go-to-market planning.",
    features: ["Market research", "Entry strategy", "Partner identification", "Regulatory review", "Local entity setup", "Distribution network"],
  },
  "cross-border": {
    desc: "Seamless cross-border logistics solutions managing customs transitions, tax compliance, and regulatory handoffs between countries and trade blocs.",
    features: ["Multi-country coordination", "Customs transition", "Tax & duty management", "Cross-dock hubs", "Regulatory handoff", "Trade lane expertise"],
  },
  "project-cargo": {
    desc: "Specialized project cargo handling for oversized, heavy-lift, and complex shipments requiring engineered transport solutions and multi-modal coordination.",
    features: ["Route engineering", "Heavy lift coordination", "Oversized permits", "Multi-modal planning", "On-site supervision", "Risk management"],
  },
  "container-logistics": {
    desc: "End-to-end container logistics management covering equipment procurement, tracking, storage, and repositioning across global trade lanes.",
    features: ["Container procurement", "Real-time tracking", "Storage management", "Repositioning", "Equipment leasing", "Depot services"],
  },
  "trade-consulting": {
    desc: "Expert trade consulting services helping businesses optimize their international trade operations, reduce costs, and navigate complex regulatory environments.",
    features: ["Trade strategy", "Cost optimization", "Process improvement", "Technology implementation", "Training programs", "Compliance reviews"],
  },
  "international-support": {
    desc: "Comprehensive international business support covering entity setup, local representation, cultural advisory, and ongoing operational assistance in new markets.",
    features: ["Entity registration", "Local representation", "Cultural advisory", "Operational support", "Regulatory liaison", "Market intelligence"],
  },
};

export const bentoCards = [
  { eyebrow: "01", title: "Global Reach", body: "Active trade corridors across 50+ countries spanning Asia, Europe, Africa, the Middle East, and the Americas with multi-modal coverage.", metric: "50+ Countries" },
  { eyebrow: "02", title: "Strategic Sourcing", body: "Deep supplier networks across manufacturing hubs enabling competitive sourcing, quality assurance, and reliable supply chains.", metric: "500+ Partners" },
  { eyebrow: "03", title: "Export Excellence", body: "End-to-end export management with documentation, compliance, and logistics coordination for seamless international market access.", metric: "1000+ Shipments" },
  { eyebrow: "04", title: "Import Solutions", body: "Complete import management from supplier coordination to customs clearance with duty optimization and delivery execution.", metric: "98% Success" },
  { eyebrow: "05", title: "Regulatory Compliance", body: "Expert navigation of customs regulations, trade agreements, and compliance requirements across all operating markets.", metric: "ISO Certified" },
  { eyebrow: "06", title: "Logistics Expertise", body: "Integrated logistics control tower providing end-to-end visibility and proactive exception management.", metric: "24/7 Control" },
];

export const networkStats = [
  ["100+", "Global Partners"],
  ["50+", "Countries"],
  ["1000+", "Shipments"],
  ["98%", "Client Retention"],
];

export const whyChooseUs = [
  { title: "Global Partner Network", body: "Vetted carriers, brokers, warehouses, and inspection partners across all major trade corridors ensuring reliable service delivery.", icon: "Globe" },
  { title: "End-to-End Visibility", body: "Real-time tracking and control tower oversight from supplier readiness to final delivery proof with proactive exception management.", icon: "Eye" },
  { title: "Regulatory Expertise", body: "Deep knowledge of customs regulations, trade agreements, and compliance requirements across 50+ countries.", icon: "Shield" },
  { title: "Cost Optimization", body: "Strategic rate negotiation, route optimization, and consolidation programs that reduce total landed cost without compromising service.", icon: "TrendingDown" },
  { title: "Dedicated Support", body: "A human control desk assigned to your account that knows your supply chain, your cargo, and your next decision.", icon: "Headphones" },
  { title: "Risk Management", body: "Comprehensive cargo insurance, compliance screening, and contingency planning to protect your shipments end to end.", icon: "ShieldCheck" },
];

export const processSteps = [
  { title: "Requirement Analysis", body: "We assess your cargo, origin, destination, timeline, budget, and risk profile to build a comprehensive movement plan." },
  { title: "Supplier Identification", body: "Our global sourcing team identifies and vets suppliers, manufacturers, and partners that meet your quality and compliance standards." },
  { title: "Compliance Verification", body: "Regulatory requirements, trade agreements, permits, and documentation needs are mapped and verified for every shipment." },
  { title: "Logistics Planning", body: "Optimal routes, carriers, incoterms, consolidation strategies, and warehousing are selected and confirmed." },
  { title: "Customs Processing", body: "HS classification, duty calculation, permit filing, and customs documentation are prepared and submitted for clearance." },
  { title: "Shipment Tracking", body: "Real-time milestone tracking with proactive alerts, exception management, and status reporting through delivery." },
  { title: "Final Delivery", body: "Warehouse receipt, proof of delivery, customs closure, and complete shipment report are delivered to close the cycle." },
];

export const testimonials = [
  { name: "Amara Lindholm", role: "VP Supply Chain, Nordic Medical Group", company: "NMG", quote: "Their team turned a complex international import program into a calm weekly rhythm. The documentation quality alone changed our board reporting.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80" },
  { name: "Rahul Mehta", role: "Director, Orion Components", company: "ORION", quote: "We expanded into three export markets without adding operational chaos. Every exception arrived with context, ownership, and a practical next move.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80" },
  { name: "Elena Rossi", role: "COO, ArcLine Retail", company: "ARCLINE", quote: "The control tower gave us a level of shipment clarity we had not seen from global forwarders. Premium service, but with real operational substance.", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" },
  { name: "Kenji Watanabe", role: "Procurement Lead, TeraForge Mobility", company: "TFM", quote: "From supplier verification to port release, the entire lane felt engineered. We stopped losing time in handoff gaps.", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80" },
  { name: "Sarah Chen", role: "Global Supply Chain Director, Evergreen Retail", company: "Evergreen", quote: "Their cross-border logistics expertise opened markets we couldn't access before. The compliance handling is world-class.", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80" },
  { name: "Marcus Adeyemi", role: "CEO, Pan-African Trade Group", company: "PAT Group", quote: "Finally a partner who understands both the strategic and operational sides of international trade. Exceptional team.", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80" },
];

export const industries = [
  { title: "Agriculture", desc: "Commodity shipping, cold chain logistics, and regulatory compliance for agricultural exports and imports.", image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80" },
  { title: "Construction Materials", desc: "Bulk material transport, project cargo handling, and supply chain coordination for construction projects.", image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80" },
  { title: "Industrial Equipment", desc: "Heavy machinery logistics, oversized cargo handling, and global equipment sourcing and distribution.", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" },
  { title: "Electronics", desc: "Time-sensitive electronics logistics with ESD-safe handling, security protocols, and global distribution.", image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=800&q=80" },
  { title: "Automotive", desc: "Just-in-time automotive supply chain management, parts logistics, and vehicle distribution services.", image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=800&q=80" },
  { title: "Consumer Goods", desc: "Retail and consumer product logistics with multi-channel distribution and seasonal demand management.", image: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80" },
  { title: "Textiles", desc: "Textile and apparel supply chain management from raw material sourcing to finished product distribution.", image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80" },
  { title: "Food Products", desc: "Food-grade logistics with temperature control, FDA compliance, and specialized handling requirements.", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80" },
  { title: "Chemicals", desc: "Hazardous materials logistics, chemical supply chain management, and regulatory compliance expertise.", image: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=800&q=80" },
];

export const marqueeItems = [
  "GLOBAL TRADE", "IMPORT EXPORT", "SUPPLY CHAIN", "LOGISTICS SOLUTIONS",
  "INTERNATIONAL SOURCING", "CUSTOMS BROKERAGE", "FREIGHT FORWARDING",
  "GLOBAL TRADE", "IMPORT EXPORT", "SUPPLY CHAIN",
];

export const tradeRoutes = [
  { from: "Mumbai", to: "Dubai", path: "M670 318 C625 292 604 284 590 282" },
  { from: "Dubai", to: "Rotterdam", path: "M590 282 C560 235 520 215 490 204" },
  { from: "Singapore", to: "Shanghai", path: "M740 366 C764 326 775 287 780 258" },
  { from: "New York", to: "Rotterdam", path: "M280 234 C350 166 430 170 490 204" },
  { from: "Mumbai", to: "Mombasa", path: "M670 318 C616 342 582 364 560 366" },
  { from: "Santos", to: "Dubai", path: "M360 420 C438 330 512 295 590 282" },
  { from: "Sydney", to: "Singapore", path: "M830 468 C806 430 780 398 740 366" },
];

export const routeMarkers = [
  { city: "Mumbai", x: 67, y: 53, region: "South Asia" },
  { city: "Dubai", x: 59, y: 47, region: "Middle East" },
  { city: "Rotterdam", x: 49, y: 34, region: "Europe" },
  { city: "Singapore", x: 74, y: 61, region: "ASEAN" },
  { city: "Shanghai", x: 78, y: 43, region: "East Asia" },
  { city: "New York", x: 28, y: 39, region: "North America" },
  { city: "Santos", x: 36, y: 70, region: "South America" },
  { city: "Mombasa", x: 56, y: 61, region: "East Africa" },
  { city: "Sydney", x: 83, y: 78, region: "Oceania" },
  { city: "London", x: 47, y: 30, region: "Europe" },
];

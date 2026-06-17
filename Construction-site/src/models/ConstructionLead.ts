import mongoose from "mongoose";

const constructionLeadSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  selectedServices: [String],
  projectType: String,
  projectLocation: String,
  budgetRange: String,
  timeline: String,
  message: String,
  notes: String,
  source: String,
  status: { type: String, enum: ["new", "contacted", "qualified", "proposal_sent", "won", "lost", "disqualified", "converted", "archived"], default: "new" },
}, { timestamps: true });

export default mongoose.models.ConstructionLead || mongoose.model("ConstructionLead", constructionLeadSchema);

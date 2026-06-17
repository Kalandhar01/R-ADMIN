import mongoose from "mongoose";

const constructionLeadStatusHistorySchema = new mongoose.Schema({
  leadId: { type: mongoose.Schema.Types.ObjectId, ref: "ConstructionLead", required: true },
  fromStatus: String,
  toStatus: { type: String, required: true },
  changedBy: String,
  note: String,
}, { timestamps: true });

export default mongoose.models.ConstructionLeadStatusHistory || mongoose.model("ConstructionLeadStatusHistory", constructionLeadStatusHistorySchema);

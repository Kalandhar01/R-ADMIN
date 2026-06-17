import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  division: String,
  slug: { type: String, unique: true },
  title: String,
  category: String,
  location: String,
  summary: String,
  description: String,
  year: String,
  status: String,
  clientName: String,
  imageUrl: String,
  featured: Boolean,
  position: { type: Number, default: 0 },
  metadata: mongoose.Schema.Types.Mixed,
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model("Project", projectSchema);

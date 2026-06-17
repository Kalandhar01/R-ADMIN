import mongoose from "mongoose";

const mediaAssetSchema = new mongoose.Schema({
  kind: { type: String, required: true },
  title: String,
  altText: String,
  url: { type: String, required: true },
  provider: String,
  mimeType: String,
  size: Number,
  width: Number,
  height: Number,
  metadata: mongoose.Schema.Types.Mixed,
  division: String,
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  serviceId: mongoose.Schema.Types.ObjectId,
  teamMemberId: mongoose.Schema.Types.ObjectId,
  blogPostId: mongoose.Schema.Types.ObjectId,
}, { timestamps: true });

export default mongoose.models.MediaAsset || mongoose.model("MediaAsset", mediaAssetSchema);

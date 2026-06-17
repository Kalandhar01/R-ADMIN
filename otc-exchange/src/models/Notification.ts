import mongoose, { Schema, type Document } from "mongoose";

export interface INotification extends Document {
  adminId: mongoose.Types.ObjectId;
  dedupeKey: string;
  title: string;
  message: string;
  project: string;
  division: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "unread" | "read" | "archived";
  entity: string;
  entityId: string;
  actionUrl: string;
  metadata: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    adminId: { type: Schema.Types.ObjectId, ref: "Admin" },
    dedupeKey: { type: String, unique: true },
    title: { type: String },
    message: { type: String },
    project: { type: String },
    division: { type: String },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
    },
    status: {
      type: String,
      enum: ["unread", "read", "archived"],
      default: "unread",
    },
    entity: { type: String },
    entityId: { type: String },
    actionUrl: { type: String },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true },
);

const Notification =
  mongoose.models.Notification ||
  mongoose.model<INotification>("Notification", NotificationSchema);

export default Notification;

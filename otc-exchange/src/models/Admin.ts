import mongoose, { Schema, type Document } from "mongoose";

export interface IAdmin extends Document {
  email: string;
  name: string;
  imageUrl: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema = new Schema<IAdmin>(
  {
    email: { type: String, unique: true },
    name: { type: String },
    imageUrl: { type: String },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Admin =
  mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema);

export default Admin;

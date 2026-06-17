import mongoose, { Schema, type Document } from "mongoose";

export interface INewsletterSubscriber extends Document {
  email: string;
  division: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const NewsletterSubscriberSchema = new Schema<INewsletterSubscriber>(
  {
    email: { type: String, unique: true, required: true, lowercase: true },
    division: { type: String, default: "otc-exchange" },
    status: { type: String, default: "active" },
  },
  { timestamps: true },
);

const NewsletterSubscriber =
  mongoose.models.NewsletterSubscriber ||
  mongoose.model<INewsletterSubscriber>("NewsletterSubscriber", NewsletterSubscriberSchema);

export default NewsletterSubscriber;

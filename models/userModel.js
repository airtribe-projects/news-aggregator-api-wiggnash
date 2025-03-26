import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    preferences: {
      type: {
        categories: { type: [String], default: [] },
        sources: { type: [String], default: [] },
        language: { type: String, default: "en" },
        region: { type: String, default: "global" },
        readingFrequency: {
          type: String,
          enum: ["daily", "weekly", "monthly"],
          default: "daily",
        },
        trendingPreference: { type: Boolean, default: true },
      },
      default: {},
      required: false,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;

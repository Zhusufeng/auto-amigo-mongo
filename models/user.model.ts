import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: String,
    gasEntries: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Gas",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);

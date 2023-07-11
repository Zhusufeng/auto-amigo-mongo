import mongoose from "mongoose";
import Gas from './gas.model';

const UserSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    gasEntries: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Gas.modelName,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);

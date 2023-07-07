import mongoose from "mongoose";

const GasSchema = new mongoose.Schema(
  {
    previousMileage: Number,
    currentMileage: Number,
    gallons: Number,
    pricePerGallon: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Gas || mongoose.model("Gas", GasSchema);

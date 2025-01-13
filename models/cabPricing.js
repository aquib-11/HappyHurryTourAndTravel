import mongoose from "mongoose";

const cabPricingSchema = mongoose.Schema(
  {
    route: {
      type: String,
    },
    pricing: [
      {
        cabType: {
          type: mongoose.Types.ObjectId,
          ref: "cabs", // Reference to the cab model
        },
        price: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("cabPricing", cabPricingSchema);
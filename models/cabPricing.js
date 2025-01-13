import mongoose from "mongoose";

const cabPricingSchema = mongoose.Schema(
  {
    route: {
      type: String,
    },
    pricing: [
      {
        cabType: {
          type: String,
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
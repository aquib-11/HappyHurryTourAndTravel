import mongoose from "mongoose";

const priceListSchema = mongoose.Schema(
  {
    destination: {
      type: String,
      required: true,
    },
    prices: [{
      cab: {
        type: mongoose.Types.ObjectId,
        ref: "cabs",
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }],
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "TravelAdminUser",
    },
  },
  { timestamps: true }
);

export default mongoose.model("PriceList", priceListSchema);

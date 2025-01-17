import mongoose from "mongoose";

const bookOneWaySchema = mongoose.Schema(
  {
    customerName: String,
    customerEmail: String,
    pickupLocation: String,
    dropLocation: String,
    pickupDate: String,
    pickupTime: String,
    selectCab:{
      type: mongoose.Types.ObjectId,
      ref: "cabs",
    },
    cabName: String,
    cabImage: String,
    paymentMethod: String,
    paymentStatus: String,
  },
  { timestamps: true }
);

export default mongoose.model("bookOneWays", bookOneWaySchema);

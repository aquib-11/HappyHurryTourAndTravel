import mongoose from "mongoose";

const bookTwoWaySchema = mongoose.Schema(
  {
    customerName: String,
    customerEmail: String,
pickupLocation: String,
dropLocation: String,
pickupDate: String,
pickupTime: String,
returnDate: String,
returnTime: String,
phoneNumber: String,
selectCab:{
  type: mongoose.Types.ObjectId,
  ref: "cabs",
}  },
  { timestamps: true }
);

export default mongoose.model("bookTwoWays", bookTwoWaySchema);



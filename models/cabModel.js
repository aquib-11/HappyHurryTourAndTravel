import mongoose from "mongoose";

const cabSchema = mongoose.Schema(
  {
    // Vehicle details
    name: String,
    seatingCapacity: Number,
    image: String,
    imageId: String,

    features: Array,

    // Booking details
    isAvailable: {
      type: Boolean,
      default: true
    },
    driverDetails: {
      name: String,
      phone: String
    },

    // Administrative
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "TravelAdminUser",
    },
  },
  { timestamps: true }
);

export default mongoose.model("cabs", cabSchema);



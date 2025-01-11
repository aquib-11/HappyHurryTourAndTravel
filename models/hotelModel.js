import mongoose from "mongoose";

const hotelSchema = mongoose.Schema(
  {
    name: String,
    location: String,
    description: String,
    price: Number,
    rating: {
      type: Number,
      default: 0
    },
    images: [{
      image: String,
      imageId: String
    }],
    amenities: Array,
    roomTypes: Array,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "TravelAdminUser",
    },
  },
  { timestamps: true }
);

export default mongoose.model("hotels", hotelSchema);

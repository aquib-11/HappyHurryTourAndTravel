import mongoose from "mongoose";

const tourPackageSchema = mongoose.Schema({
  name: String,
    totaldays: Number,
    totalnights: Number,
    adultPrice: Number,
    childPrice: Number,
    infantPrice: Number,
  image: String,
  imageId: String,
  overview: String,
  highlights: [String],
  inclusions: [String],
  exclusions: [String],
  itinerary: [String],
  destinations: [String],
  hotels: [String],
    minGroupSize: Number,
    maxGroupSize: Number,
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "TravelAdminUser",
  }
}, { timestamps: true });

export default mongoose.model("tourPackages", tourPackageSchema);

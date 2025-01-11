import mongoose from "mongoose";
const destinationScheme = mongoose.Schema(
  {
    destinationName: String,
    title: String,
    images: [{
      image: String,
      imageId: String
    }],
    overview: String,
    highlights: Array,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "TravelAdminUser",
    },
  },
  { timestamps: true }
);

export default mongoose.model("destinations", destinationScheme);

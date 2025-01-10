import mongoose from "mongoose";
const destinationScheme = mongoose.Schema(
  {
    title: String,
    images: Array,
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

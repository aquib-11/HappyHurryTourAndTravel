import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
  {
    // Vehicle details
    title: String,
    content: String,
    image: String,
    imageId: String,
    tags: Array,
    // Administrative
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "TravelAdminUser",
    },
  },
  { timestamps: true }
);

export default mongoose.model("blogs", blogSchema);



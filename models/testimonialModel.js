import mongoose from "mongoose";

const testimonialSchema = mongoose.Schema(
  {
    name: String,
    email: String,
message: String,
rating: String,  },
  { timestamps: true }
);

export default mongoose.model("testimonials", testimonialSchema);



import mongoose from "mongoose";

const contactSchema = mongoose.Schema(
  {
   name: String,
email: String,
phone: String,
message: String,  },
  { timestamps: true }
);

export default mongoose.model("contacts", contactSchema);



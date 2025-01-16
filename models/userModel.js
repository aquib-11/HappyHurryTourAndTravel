import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  phone: String,
  phone2: String,
  footertext: String,
  facebook: String,
  instagram: String,
  youtube: String,
  whatsapp: String,
  aboutUsStory: String,
  image: String,
  imageId: String
});

export default mongoose.model("TravelAdminUser", userSchema);

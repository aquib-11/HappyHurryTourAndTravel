import mongoose from "mongoose";

const bookPackageSchema = mongoose.Schema(
  {
    customerName: String,
    customerEmail: String,
    customerPhone: String,
    travelDate: String,
    selectPackage: {
      type: mongoose.Types.ObjectId,
      ref: "tourPackages",
    },
    message: String,
    totalChildren: String,
    totalAdults: String,
    totalInfants: String,
  },
  { timestamps: true }
);

export default mongoose.model("bookPackages", bookPackageSchema);



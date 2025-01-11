import mongoose from "mongoose";

const cabSchema = mongoose.Schema(
  {
    // Vehicle details
    name: String,
    type: {
      type: String,
    },
    seatingCapacity: Number,
    image: String,
    imageId: String,

    // Service details
    pricePerKm: Number,
    basePrice: Number,
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



// Cab Model (cabModel.js) will include:
// Vehicle details:
// name (e.g., "Toyota Innova")
// type (e.g., "SUV", "Sedan", "Luxury")
// seatingCapacity
// images (max 4, like other models)
// Service details:
// pricePerKm
// basePrice
// availableLocations (array of service areas)
// features (AC, WiFi, etc.)
// Booking details:
// isAvailable (boolean)
// driverDetails (name, phone, license)
// Administrative:
// createdBy (admin reference)
// timestamps

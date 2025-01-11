import mongoose from "mongoose";

const itineraryDaySchema = mongoose.Schema({
  dayNumber: Number,
  title: String,
  destination: {
    type: mongoose.Types.ObjectId,
    ref: 'destinations',
    required: true
  },
  activities: [{
    time: String,
    description: String,
    location: String,
    duration: String,
    type: {
      type: String,
      enum: ['Sightseeing', 'Adventure', 'Cultural', 'Leisure', 'Transfer']
    }
  }],
  meals: {
    breakfast: { 
      included: { type: Boolean, default: false },
      venue: String
    },
    lunch: { 
      included: { type: Boolean, default: false },
      venue: String
    },
    dinner: { 
      included: { type: Boolean, default: false },
      venue: String
    }
  },
  accommodation: {
    hotelId: {
      type: mongoose.Types.ObjectId,
      ref: 'hotels'
    },
    roomType: String,
    nights: Number
  },
  transportation: {
    type: String,
    mode: {
      type: String,
      enum: ['Car', 'Bus', 'Train', 'Flight', 'Mixed']
    },
    details: String // For flight numbers, train numbers, etc.
  }
});

const tourPackageSchema = mongoose.Schema({
  name: String,
  duration: {
    days: Number,
    nights: Number
  },
  startLocation: {
    city: String,
    state: String,
    pickupPoint: String
  },
  endLocation: {
    city: String,
    state: String,
    dropPoint: String
  },
  price: {
    adult: Number,
    child: Number,
    infant: Number
  },
  image: String,
  imageId: String,
  overview: String,
  highlights: [String],
  inclusions: [String],
  exclusions: [String],
  itinerary: [itineraryDaySchema],
  destinations: [{
    destinationId: {
      type: mongoose.Types.ObjectId,
      ref: 'destinations'
    },
    numberOfDays: Number,
    order: Number
  }],
  groupSize: {
    min: Number,
    max: Number
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "TravelAdminUser",
  }
}, { timestamps: true });

export default mongoose.model("tourPackages", tourPackageSchema);

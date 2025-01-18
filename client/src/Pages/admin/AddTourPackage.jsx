import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { MdDelete, MdOutlineTour } from "react-icons/md";
import { Form, useLoaderData, useNavigation } from "react-router-dom";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";

export const addTourpackageAction = async ({ request }) => {
  const formData = new FormData();
  const data = await request.formData();

  // Append each field to FormData
  for (const [key, value] of data.entries()) {
    formData.append(key, value);
  }

  try {
    const response = await customFetch.post("/tourPackage", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log({ response });
    toast.success("Tour Package added successfully");
    // return redirect("/admin/cab-home");
    return null;
  } catch (error) {
    console.log({ error });
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

export const addTourPackageLoader = async () => {
  try {
    let { data } = await customFetch.get("/destination");
    let response = await customFetch.get("/hotel");
    return (data = {
      destinations: data.destinations,
      hotels: response.data.hotels,
    });
  } catch (error) {
    console.log({ error });
    return error;
  }
};
const AddTourPackage = () => {
  const data = useLoaderData();
  console.log({ data });
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  // highlights
  const [highlights, setHighlights] = useState([]);
  const [customhighlight, setCustomhighlight] = useState("");
  // inclusions
  const [inclusions, setInclusions] = useState([]);
  const [customInclusion, setCustomInclusion] = useState("");
  // exclusions
  const [exclusions, setExclusions] = useState([]);
  const [customExclusion, setCustomExclusion] = useState("");
  // itinerary
  const [itinerary, setItinerary] = useState([]);
  const [customItinerary, setCustomItinerary] = useState("");

  // destinations
  const [selectedDestination, setSelectedDestination] = useState("");
  const [destinations, setDestinations] = useState([]);
  // hotels
  const [selectedHotel, setSelectedHotel] = useState("");
  const [hotels, setHotels] = useState([]);
  //  destinations logic
  const addDestination = () => {
    if (selectedDestination && !destinations.includes(selectedDestination)) {
      setDestinations([...destinations, selectedDestination]);
      setSelectedDestination("");
    }
  };
  const removeDestination = (destination) => {
    setDestinations(destinations.filter((d) => d !== destination));
  };
  // State for hotels

  // Function to add hotels
  const addHotel = () => {
    if (selectedHotel && !hotels.includes(selectedHotel)) {
      setHotels([...hotels, selectedHotel]);
      setSelectedHotel("");
    }
  };

  // Function to remove hotels
  const removeHotel = (hotel) => {
    setHotels(hotels.filter((h) => h !== hotel));
  };
  // highlights logic
  const addhighlight = () => {
    if (customhighlight && !highlights.includes(customhighlight)) {
      setHighlights([...highlights, customhighlight]);
      setCustomhighlight("");
    }
  };

  const removehighlight = (highlight) => {
    setHighlights(highlights.filter((h) => h !== highlight));
  };

  // inclusions logic
  const addInclusion = () => {
    if (customInclusion) {
      const inclusionsArray = customInclusion
        .split(",")
        .map((item) => item.trim());
      setInclusions([...inclusions, ...inclusionsArray]);
      setCustomInclusion("");
    }
  };

  const removeinclusion = (inclusion) => {
    setInclusions(inclusions.filter((i) => i !== inclusion));
  };

  // exclusions logic
  const addExclusion = () => {
    if (customExclusion) {
      const exclusionsArray = customExclusion
        .split(",")
        .map((item) => item.trim());
      setExclusions([...exclusions, ...exclusionsArray]);
      setCustomExclusion("");
    }
  };

  const removeExclusion = (exclusion) => {
    setExclusions(exclusions.filter((e) => e !== exclusion));
  };

  // itinerary logic
  const addItinerary = () => {
    if (customItinerary) {
      const itineraryArray = customItinerary
        .split("###")
        .map((item) => item.trim());
      setItinerary([...itinerary, ...itineraryArray]);
      setCustomItinerary("");
    }
  };

  const removeItinerary = (item) => {
    setItinerary(itinerary.filter((i) => i !== item));
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MdOutlineTour className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Add Tour Package</h2>
          </div>
        </div>
      </div>
      <Form method="post" encType="multipart/form-data" className="space-y-4">
        <div>
          <label>Tour Package Name:</label>
          <input type="text" name="name" required className="inputText" />
        </div>
        <div>
          <label>Total Days:</label>
          <input
            type="number"
            name="totaldays"
            required
            className="inputText"
            min="1"
          />
        </div>
        <div>
          <label>Total Nights:</label>
          <input
            type="number"
            name="totalnights"
            required
            className="inputText"
            min="1"
          />
        </div>
        <div>
          <label>adult price :</label>
          <input
            type="number"
            name="adultPrice"
            required
            className="inputText"
            min="1"
          />
        </div>
        <div>
          <label>child price :</label>
          <input
            type="number"
            name="childPrice"
            required
            className="inputText"
            min="1"
          />
        </div>
        <div>
          <label>infant price :</label>
          <input
            type="number"
            name="infantPrice"
            required
            className="inputText"
            min="1"
          />
        </div>
        <div>
          <label>Min Group Size:</label>
          <input
            type="number"
            name="minGroupSize"
            required
            className="inputText"
            min="1"
          />
        </div>
        <div>
          <label>Max Group Size:</label>
          <input
            type="number"
            name="maxGroupSize"
            required
            className="inputText"
            min="1"
          />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" name="image" required className="inputText" />
        </div>
        <div>
          <div>
            <label>overview:</label>
            <input type="text" name="overview" required className="inputText" />
          </div>
          <div>
            <label>Highlights:</label>
            <div className="flex items-center gap-2 flex-col md:flex-row">
              <input
                type="text"
                value={customhighlight}
                onChange={(e) => setCustomhighlight(e.target.value)}
                placeholder="Add your own highlight"
                className="inputText"
              />
              <button
                type="button"
                onClick={addhighlight}
                className="bg-blue-500 text-white p-2 rounded"
              >
                <FaPlus />
              </button>
            </div>
          </div>
          <div className="flex flex-col flex-wrap gap-2 mt-2">
            {highlights.map((highlight, index) => (
              <span
                key={index}
                className="bg-gray-200 px-2 py-1 rounded-md max-w-fit flex justify-between items-center"
              >
                {highlight}
                <div
                  onClick={() => removehighlight(highlight)}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                >
                  <MdDelete />
                </div>
              </span>
            ))}
          </div>
          {highlights.map((highlight, index) => (
            <input
              type="hidden"
              name="highlights"
              value={highlight}
              key={index}
            />
          ))}
        </div>
        <div>
          <label>Inclusions:</label>
          <div className="flex items-center gap-2 flex-col md:flex-row">
            <input
              type="text"
              value={customInclusion}
              onChange={(e) => setCustomInclusion(e.target.value)}
              placeholder="Add your own inclusion"
              className="inputText"
            />
            <button
              type="button"
              onClick={addInclusion}
              className="bg-blue-500 text-white p-2 rounded"
            >
              <FaPlus />
            </button>
          </div>
          <div className="flex flex-col flex-wrap gap-2 mt-2">
            {inclusions.map((inclusion, index) => (
              <span
                key={index}
                className="bg-gray-200 px-2 py-1 rounded-md max-w-fit flex justify-between items-center"
              >
                {inclusion}
                <div
                  onClick={() => removeinclusion(inclusion)}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                >
                  <MdDelete />
                </div>
              </span>
            ))}
          </div>
          {inclusions.map((inclusion, index) => (
            <input
              type="hidden"
              name="inclusions"
              value={inclusion}
              key={index}
            />
          ))}
        </div>
        <div>
          <label>Exclusions:</label>
          <div className="flex items-center gap-2 flex-col md:flex-row">
            <input
              type="text"
              value={customExclusion}
              onChange={(e) => setCustomExclusion(e.target.value)}
              placeholder="Add your own exclusion"
              className="inputText"
            />
            <button
              type="button"
              onClick={addExclusion}
              className="bg-blue-500 text-white p-2 rounded"
            >
              <FaPlus />
            </button>
          </div>
          <div className="flex flex-col flex-wrap gap-2 mt-2">
            {exclusions.map((exclusion, index) => (
              <span
                key={index}
                className="bg-gray-200 px-2 py-1 rounded-md max-w-fit flex justify-between items-center"
              >
                {exclusion}
                <div
                  onClick={() => removeExclusion(exclusion)}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                >
                  <MdDelete />
                </div>
              </span>
            ))}
          </div>
          {exclusions.map((exclusion, index) => (
            <input
              type="hidden"
              name="exclusions"
              value={exclusion}
              key={index}
            />
          ))}
        </div>
        <div>
          <label>Itinerary:</label>
          <div className="flex items-center gap-2 flex-col md:flex-row">
            <input
              type="text"
              value={customItinerary}
              onChange={(e) => setCustomItinerary(e.target.value)}
              placeholder="Add your own itinerary"
              className="inputText"
            />
            <button
              type="button"
              onClick={addItinerary}
              className="bg-blue-500 text-white p-2 rounded"
            >
              <FaPlus />
            </button>
          </div>
          <div className="flex flex-col flex-wrap gap-2 mt-2">
            {itinerary.map((item, index) => (
              <span
                key={index}
                className="bg-gray-200 px-2 py-1 rounded-md max-w-fit flex justify-between items-center"
              >
                Day {index + 1}: {item}
                <div
                  onClick={() => removeItinerary(item)}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                >
                  <MdDelete />
                </div>
              </span>
            ))}
          </div>
          {itinerary.map((item, index) => (
            <input type="hidden" name="itinerary" value={item} key={index} />
          ))}
        </div>
        <div>
          <label>select destinations</label>
          <div className="flex items-center gap-2 flex-col md:flex-row">
            <select
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
              className="inputText"
            >
              <option value="">Select a destination</option>
              {data.destinations.map((destination, index) => (
                <option key={index} value={destination._id}>
                  {destination.destinationName}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={addDestination}
              className="bg-blue-500 text-white p-2 rounded"
            >
              <FaPlus />
            </button>
          </div>
          <div className="flex  flex-wrap gap-2 mt-2">
            {destinations.map((destination, index) => (
              <span
                key={index}
                className="bg-gray-200 px-2 py-1 rounded-md max-w-fit flex justify-between items-center"
              >
                {
                  data.destinations.find((d) => d._id === destination)
                    ?.destinationName
                }
                <div
                  onClick={() => removeDestination(destination)}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                >
                  <MdDelete />
                </div>
              </span>
            ))}
          </div>
          {destinations.map((destination, index) => (
            <input
              type="hidden"
              name="destinations"
              value={destination}
              key={index}
            />
          ))}
        </div>
        {/* hotels */}
        <div>
          <label>select hotels</label>
          <div className="flex items-center gap-2 flex-col md:flex-row">
            <select
              value={selectedHotel}
              onChange={(e) => setSelectedHotel(e.target.value)}
              className="inputText"
            >
              <option value="">Select a hotel</option>
              {data.hotels.map((hotel, index) => (
                <option key={index} value={hotel._id}>
                  {hotel.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={addHotel}
              className="bg-blue-500 text-white p-2 rounded"
            >
              <FaPlus />
            </button>
          </div>
          <div className="flex  flex-wrap gap-2 mt-2">
            {hotels.map((hotel, index) => (
              <span
                key={index}
                className="bg-gray-200 px-2 py-1 rounded-md max-w-fit flex justify-between items-center"
              >
                {data.hotels.find((d) => d._id === hotel)?.name}
                <div
                  onClick={() => removeHotel(hotel)}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                >
                  <MdDelete />
                </div>
              </span>
            ))}
          </div>
          {hotels.map((hotel, index) => (
            <input type="hidden" name="hotels" value={hotel} key={index} />
          ))}
        </div>
        <button type="submit" className="submitButton" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Package"}
        </button>
      </Form>
    </div>
  );
};
export default AddTourPackage;

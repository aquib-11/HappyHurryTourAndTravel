import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { Form, redirect, useLoaderData, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../../../utils/customFetch";

export const editTourpackageAction = async ({ request, params }) => {
    const formData = new FormData();
    const data = await request.formData();

    // Append each field to FormData
    for (const [key, value] of data.entries()) {
    formData.append(key, value);
    }

    try {
    const response = await customFetch.put(`/tourPackage/${params.id}`, formData, {
        headers: {
        "Content-Type": "multipart/form-data",
        },
    });
    console.log({ response });
    toast.success("Package updated successfully");
    return redirect("/all-packages");
    } catch (error) {
    console.log({ error });
    toast.error(error?.response?.data?.msg);
    return error;
    }
};

export const editTourPackageLoader =async ({params}) => {
    try {
    let {data} = await customFetch.get("/destination");
    let response1 = await customFetch.get("/hotel");
    let response2 = await customFetch.get(`/tourPackage/${params.id}`);
    return  data = {destinations:data.destinations,hotels:response1.data.hotels,tourPackage:response2.data._package};
    } catch (error) {
    console.log({ error });
    return error;
    }
};
const EditPackage = () => {
    const data = useLoaderData();
    console.log({data});
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
    // highlights
    const [highlights, setHighlights] = useState(data.tourPackage.highlights);
    const [customhighlight, setCustomhighlight] = useState("");
    // inclusions
    const [inclusions, setInclusions] = useState(data.tourPackage.inclusions);
    const [customInclusion, setCustomInclusion] = useState("");
    // exclusions
    const [exclusions, setExclusions] = useState(data.tourPackage.exclusions);
    const [customExclusion, setCustomExclusion] = useState("");
    // itinerary
    const [itinerary, setItinerary] = useState(data.tourPackage.itinerary);
    const [customItinerary, setCustomItinerary] = useState("");

    // destinations
    const [selectedDestination, setSelectedDestination] = useState("");
    const [destinations, setDestinations] = useState(data.tourPackage.destinations);
    // hotels
    const [selectedHotel, setSelectedHotel] = useState("");
    const [hotels, setHotels] = useState(data.tourPackage.hotels);
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
            const inclusionsArray = customInclusion.split(',').map(item => item.trim());
            setInclusions([...inclusions, ...inclusionsArray]);
            setCustomInclusion('');
        }
    };

    const removeinclusion = (inclusion) => {
        setInclusions(inclusions.filter((i) => i !== inclusion));
    };  

    // exclusions logic
    const addExclusion = () => {
        if (customExclusion) {
            const exclusionsArray = customExclusion.split(',').map(item => item.trim());
            setExclusions([...exclusions, ...exclusionsArray]);
            setCustomExclusion('');
        }
    };

    const removeExclusion = (exclusion) => {
        setExclusions(exclusions.filter((e) => e !== exclusion));
    };

    // itinerary logic
    const addItinerary = () => {
        if (customItinerary) {
            const itineraryArray = customItinerary.split("###").map(item => item.trim());
            setItinerary([...itinerary, ...itineraryArray]);
            setCustomItinerary('');
        }
    };

    const removeItinerary = (item) => {
        setItinerary(itinerary.filter((i) => i !== item));
    };

    return  <div>
    <h2 className="text-center">Edit Tour Package</h2>
    <Form method="post" encType="multipart/form-data" className="space-y-4">
        <div>
            <label>Tour Package Name:</label>
            <input
                type="text"
                name="name"
                required
                className="inputText"
                defaultValue={data.tourPackage.name}
            />
        </div>
        <div>
            <label>Total Days:</label>
            <input
                type="number"
                name="totaldays"
                required
                className="inputText"
                min="1"
                defaultValue={data.tourPackage.totaldays}
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
                defaultValue={data.tourPackage.totalnights}
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
                defaultValue={data.tourPackage.adultPrice}
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
                defaultValue={data.tourPackage.childPrice}
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
                defaultValue={data.tourPackage.infantPrice}
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
                defaultValue={data.tourPackage.minGroupSize}
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
                defaultValue={data.tourPackage.maxGroupSize}
            />
        </div>
        <div>
            <label>Image:</label>
            <input
                type="file"
                name="image"
                className="inputText"
            />
        </div>
        <div>
            <div>
                <label>overview:</label>
                <input
                    type="text"
                    name="overview"
                    required
                    className="inputText"
                    defaultValue={data.tourPackage.overview}
                />
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
                <input type="hidden" name="highlights" value={highlight} key={index} />
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
                <input type="hidden" name="inclusions" value={inclusion} key={index} />
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
                <input type="hidden" name="exclusions" value={exclusion} key={index} />
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
            {data.destinations.find((d) => d._id === destination)?.destinationName}
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
        <input type="hidden" name="destinations" value={destination} key={index} />
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
            {isSubmitting ? "Updating..." : "Edit Package"}
        </button>
    </Form>
</div>
};
export default EditPackage;
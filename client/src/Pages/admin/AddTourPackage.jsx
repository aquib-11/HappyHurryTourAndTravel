import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { Form, useNavigation } from "react-router-dom";
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
      toast.success("Cab added successfully");
      // return redirect("/admin/cab-home");
      return null;
    } catch (error) {
      console.log({ error });
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };
  
const AddTourPackage = () => {
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
            const itineraryArray = customItinerary.split(',').map(item => item.trim());
            setItinerary([...itinerary, ...itineraryArray]);
            setCustomItinerary('');
        }
    };

    const removeItinerary = (item) => {
        setItinerary(itinerary.filter((i) => i !== item));
    };

    return  <div>
    <h2 className="text-center">Add Tour Package</h2>
    <Form method="post" encType="multipart/form-data" className="space-y-4">
        <div>
            <label>Tour Package Name:</label>
            <input
                type="text"
                name="name"
                required
                className="inputText"
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
            <input
                type="file"
                name="image"
                required
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
                        {item}
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
        <button type="submit" className="submitButton" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Cab"}
        </button>
    </Form>
</div>
};
export default AddTourPackage;
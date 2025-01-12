import React from 'react'
import { FaPlus } from 'react-icons/fa6'
import { Form } from 'react-router-dom'


//     // Vehicle details
//     name: String,
//     type: {
//       type: String,
//     },
//     seatingCapacity: Number,
//     image: String,
//     imageId: String,

//     // Service details
//     pricePerKm: Number,
//     basePrice: Number,
//     features: Array,

//     // Booking details
//     isAvailable: {
//       type: Boolean,
//       default: true
//     },
//     driverDetails: {
//       name: String,
//       phone: String
//     },

//     // Administrative
//     createdBy: {
//       type: mongoose.Types.ObjectId,
//       ref: "TravelAdminUser",
//     },
//   },
//   { timestamps: true }
// );


export const addCabAction = async ({ request }) => {
  const formData = await request.formData();
console.log({fomdata:formData.values});
return null
}

const AddCab = () => {
  
  return (
    <div>
      <h2 className="text-center">Add Cab</h2>
      <Form method="post" encType="multipart/form-data" className="space-y-4">
        <div>
          <label>Car Name:</label>
          <input type="text" name="name" required className="inputText" />
        </div>
        <div>
          <label>Car Model:</label>
          <input type="text" name="type" required className="inputText" />
        </div>
        <div>
          <label>Seat Capacity:</label>
          <input
            type="number"
            name="seatingCapacity"
            required
            className="inputText"
          />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" name="image" required className="inputText" />
        </div>
        <div>
          <label>Driver's Name:</label>
          <input
            type = "text"
            required
            className="inputText"
          ></input>
        </div>
        <div>
          <label>Driver's Ph. Number:</label>
          <div className="flex items-center gap-2">
            <input
              type="tel"
              required
              className="inputText"
            />
            <button
              type="button"
              className="bg-blue-500 text-white p-2 rounded"
            >
              <FaPlus />
            </button>
          </div>
          {/* <div className="flex flex-col flex-wrap gap-2 mt-2">
            {amenities.map((amenity, index) => (
              <span
                key={index}
                className="bg-gray-200 px-2 py-1 rounded-md max-w-fit flex justify-between items-center"
              >
                {amenity}
                <div
                  onClick={() => removeAmenity(amenity)}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                >
                  <MdDelete />
                </div>
              </span>
            ))}
          </div>
          {amenities.map((amenity, index) => (
            <input type="hidden" name="amenities" value={amenity} key={index} />
          ))} */}
        </div>
        <button type="submit" className="submitButton">
          Add Cab
        </button>
      </Form>
    </div>
  )
}

export default AddCab

import React from "react";
import {
  Form,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

export const uploadDestinationImagesAction = async ({ params, request }) => {
  const formData = await request.formData();
  console.log({ formData });
  try {
    await customFetch.post(`/destination/${params.id}/images`, formData);
    toast.success("Image added successfully");
    return redirect(`/admin/add-destination-images/${params.id}`);
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
export const deleteImageAction = async ({ params }) => {
  try {
    await customFetch.delete(
      `/destination/${params.id}/images/${params.imageId}`
    );
    toast.success("Image deleted successfully");
    return redirect(`/admin/add-destination-images/${params.id}`);
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
export const uploadDestinationImagesLoader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/destination/${params.id}/images`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AddDestinationImages = () => {
  const data = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <div className="space-y-4">
      <h3 className="text-center">Add Destination Images</h3>
      <Form className="space-y-4" method="post" encType="multipart/form-data">
        <input type="file" className="uploadImageInput" name="image" />
        <button className="submitButton" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Uploading..." : "Upload"}
        </button>
      </Form>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data?.images?.map((image) => (
          <div>
            <img
              key={image}
              src={image.image}
              alt="Destination"
              className="w-full h-64 object-cover"
            />

            <Form
              method="delete"
              action={`/admin/delete-destination-image/${image._id}`}
            >
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                type="submit"
              >
                Delete
              </button>
            </Form>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddDestinationImages;

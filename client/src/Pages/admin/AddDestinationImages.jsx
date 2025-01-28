import React, { useState } from "react";
import {
  Form,
  useLoaderData,
  useNavigate,
  useNavigation,
  useParams,
} from "react-router-dom";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";
import { DeleteModal } from "../../components";

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
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteImageId, setDeleteImageId] = useState(null);
  const { id } = useParams();
  const data = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const navigate = useNavigate();

  const handleDelete = (imageId) => {
    setDeleteImageId(imageId);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      setIsDeleting(true);
      await customFetch.delete(`/destination/${id}/images/${deleteImageId}`);
      toast.success("Image deleted successfully");
      navigate(`/admin/add-destination-images/${id}`);
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    } finally {
      setIsDeleting(false);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-center">Add Destination Images</h3>
      <Form className="space-y-4" method="post" encType="multipart/form-data">
        <input type="file" className="uploadImageInput" name="image" required />
        <button className="submitButton" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Uploading..." : "Upload"}
        </button>
      </Form>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data?.images?.map((image) => (
          <div key={image.imageId} className="relative">
            <img
              src={image.image}
              alt="Destination"
              className="w-full h-64 object-cover"
            />
            <button
              className="bg-red-500 text-white p-2 text-sm rounded-md absolute bottom-2 right-2"
              onClick={() => handleDelete(image?.imageId)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        itemName="this image"
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default AddDestinationImages;

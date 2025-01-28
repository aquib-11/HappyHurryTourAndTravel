import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import { Form, redirect, useNavigation } from "react-router-dom";
import { useHomeLayoutContext } from "../../outlets/HomeOutlet";
import { User } from "lucide-react";

export const editDetailsAction = async ({ request, params }) => {
  const formData = await request.formData();
  try {
    await customFetch.patch(`auth/update-user-details/${params.id}`, formData);
    toast.success("details updated");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
  return redirect("/");
};

const EditDetails = () => {
  const { user } = useHomeLayoutContext();
 
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <User className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">
              Edit Personal Details
            </h2>
          </div>
        </div>
      </div>
      <Form method="post" encType="multipart/form-data" className="space-y-4">
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            required
            className="inputText"
            defaultValue={user?.adminDetails?.name}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            required
            className="inputText"
            defaultValue={user?.adminDetails?.email}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="number"
            name="phone"
            required
            defaultValue={user?.adminDetails?.phone}
            className="inputText"
          />
        </div>
        <div>
          <label>Secondary Phone:</label>
          <input
            type="number"
            name="phone2"
            required
            defaultValue={user?.adminDetails?.phone2}
            className="inputText"
          />
        </div>
        <div>
          <label>logo:</label>
          <input
            type="file"
            name="image"
            defaultValue={user?.adminDetails?.logo}
            className="inputText"
          />
        </div>
        <div>
          <label>Footer Text:</label>
          <input
            type="text"
            name="footertext"
            required
            defaultValue={user?.adminDetails?.footertext}
            className="inputText"
          />
        </div>
        <div>
          <label>facebook link:</label>
          <input
            type="text"
            name="facebook"
            required
            defaultValue={user?.adminDetails?.facebook}
            className="inputText"
          />
        </div>
        <div>
          <label>instagram link:</label>
          <input
            type="text"
            name="instagram"
            required
            defaultValue={user?.adminDetails?.instagram}
            className="inputText"
          />
        </div>
        <div>
          <label>whatsapp no:</label>
          <input
            type="tel"
            name="whatsapp"
            defaultValue={user?.adminDetails?.whatsapp}
            required
            className="inputText"
          />
        </div>
        <div>
          <label>about us story:</label>
          <textarea
            type="text"
            name="aboutUsStory"
            required
            defaultValue={user?.adminDetails?.aboutUsStory}
            className="inputText"
          />
        </div>
        <button type="submit" className="submitButton" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update"}
        </button>
      </Form>
    </div>
  );
};
export default EditDetails;

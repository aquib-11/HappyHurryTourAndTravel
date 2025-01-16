import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import { Form, redirect, useNavigation } from "react-router-dom";
import { useHomeLayoutContext } from "../../outlets/HomeOutlet";

export const editDetailsAction = async({request, params}) => {
        const formData = await request.formData();
        try {
          await customFetch.patch(`auth/update-user-details/${params.id}`, formData);
          toast.success("details updated");
        } catch (error) {
          toast.error(error?.response?.data?.msg);
          return error;
        }
        return redirect("/");
}   

const EditDetails = () => {
    const {user} = useHomeLayoutContext()
    console.log(user);
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
  
  return (
    <div>
    <h2 className="text-center text-[var(--bs-white)] font-sans">Add Cab</h2>
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
        {isSubmitting ? "Editing..." : "Edit Details"}
      </button>
    </Form>
  </div>
  )
}   
export default EditDetails

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
    console.log({user})
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
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          required
          className="inputText"
        />
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="number"
          name="phone"
          required
          className="inputText"
        />
      </div>
      <div>
        <label>Secondary Phone:</label>
        <input
          type="number"
          name="phone2"
          required
          className="inputText"
        />
      </div>
      <div>
        <label>logo:</label>
        <input
          type="file"
          name="image"
          required
          className="inputText"
        />
      </div>
      <div>
        <label>Footer Text:</label>
        <input
          type="text"
          name="footerText"
          required
          className="inputText"
        />
      </div>
      <div>
        <label>facebook link:</label>
        <input
          type="text"
          name="facebook"
          required
          className="inputText"
        />
      </div>
      <div>
        <label>instagram link:</label>
        <input
          type="text"
          name="instagram"
          required
          className="inputText"
        />
      </div>
      <div>
        <label>youtube link:</label>
        <input
          type="text"
          name="youtube"
          required
          className="inputText"
        />
      </div>
      <div>
        <label>whatsapp no:</label>
        <input
          type="tel"
          name="whatsapp"
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

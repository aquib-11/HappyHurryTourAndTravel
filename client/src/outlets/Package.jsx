import { Link, Outlet, useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { pakageLinks } from "../utils/NavigationLinks";

export const packageloader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`tourPackage/${params.id}`);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const Package = () => {
  const { _package } = useLoaderData();
  return (
    <div>
      <img src={_package?.image} alt={_package?.name} />

      <div className="flex gap-4"
      >
        {pakageLinks.map((link) => (
          <Link to={link.address} key={link.name}>
            {link.name}
          </Link>
        ))}
      </div>
      <Outlet context={_package} />
    </div>
  );
};
export default Package;
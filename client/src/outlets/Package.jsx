import { Link, NavLink, Outlet, useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { pakageLinks } from "../utils/NavigationLinks";
import { AllDestinaitonBanner } from "../components";

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
    <div className="container">
      {/* <img src={_package?.image} alt={_package?.name} /> */}
      <AllDestinaitonBanner randomImages={[_package?.image]} />
      <div className="w-full lg:w-fit bg-[var(--bs-card-bg)] p-4 rounded-lg my-4">
        <div className="flex flex-col md:flex-row gap-4">
          {pakageLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.address}
              end
              className={({ isActive }) =>
                `capitalize text-center px-4 py-2 rounded-md text-sm transition-colors duration-200 ${
                  isActive
                    ? "bg-violet-500 text-white"
                    : "text-violet-400 hover:text-violet-300"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
      <Outlet context={_package} />
    </div>
  );
};
export default Package;

import { Link, NavLink, Outlet, useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { pakageLinks } from "../utils/NavigationLinks";
import { AllDestinaitonBanner, PackageBookingCard } from "../components";

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
    <div className="container relative">
      <AllDestinaitonBanner image={[_package?.image]} type="package" />

      <div className="grid grid-cols-12 my-4 gap-4">
        <div className="col-span-12 md:col-span-8 ">
          <div className="w-full lg:w-fit bg-[var(--bs-card-bg)] p-4 rounded-lg ">
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
              {(_package?.hotels.length !== 0 || _package?.destinations.length !== 0 )&& (
                <NavLink
                  to="more"
                  end
                  className={({ isActive }) =>
                    `capitalize text-center px-4 py-2 rounded-md text-sm transition-colors duration-200 ${
                      isActive
                        ? "bg-violet-500 text-white"
                        : "text-violet-400 hover:text-violet-300"
                    }`
                  }
                >
                  Destinations & Hotels{" "}
                </NavLink>
              )}
            </div>
          </div>
          <Outlet context={_package} />
        </div>
        <div className="col-span-12 md:col-span-4 relative">
          <PackageBookingCard _package={_package} />
        </div>
      </div>
    </div>
  );
};
export default Package;

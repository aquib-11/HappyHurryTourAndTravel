import React from "react";
import { AllDestinaitonBanner, PackageCard } from "../../components";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";

export const allPackageLoader = async () => {
  try {
    const { data } = await customFetch.get("/tourPackage");
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
const AllPackages = () => {
  const { packages } = useLoaderData();
  if(packages.length === 0) {
    return (
      <div className="container text-center py-20">
      <h1 className="text-4xl font-bold font-sans mb-4">No Packages Listed Yet</h1>
      <p className="text-lg text-gray-500 mb-8">
        There are currently no packages available. Please check back later or try refreshing the page.
      </p>
      <button
        className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300"
        onClick={() => window.location.reload()}
      >
        Refresh
      </button>
      </div>
    );
}
  return (
    <main className="container space-y-4">
      <AllDestinaitonBanner
        image={
          "https://3.imimg.com/data3/IQ/UY/MY-12701900/international-tour.jpg"
        }
        title="All Packages"
      />
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  ">
        {packages?.map((_package) => (
          <PackageCard key={_package._id} _package={_package} />
        ))}
      </div>
    </main>
  );
};

export default AllPackages;

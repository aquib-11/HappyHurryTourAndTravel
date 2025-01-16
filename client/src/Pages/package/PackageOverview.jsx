import React from "react";
import { useOutletContext } from "react-router-dom";

const PackageOverview = () => {
  const _package = useOutletContext();
  console.log({ _package });
  return (
    <div>
      <h2 className="border-b border-b-gray-600 font-sans font-semibold my-4 capitalize text-[var(--bs-white)]">overview</h2>
      <div>
        <p>{_package?.overview}</p>
      </div>
      <div>
        <h2 className="font-sans font-semibold my-4 capitalize text-[var(--bs-white)]">Tour info</h2>
        <ul>
          <li>
            duration: {_package?.totaldays} days {_package?.totalnights} nights
          </li>
          <li>adultPrice: {_package?.adultPrice}</li>
          <li>childPrice: {_package?.childPrice}</li>
          <li>infantPrice: {_package?.infantPrice}</li>
          <li>minGroupSize: {_package?.minGroupSize}</li>
          <li>maxGroupSize: {_package?.maxGroupSize}</li>
        </ul>
      </div>
      <div>
        <h2 className="font-sans font-semibold my-4 capitalize text-[var(--bs-white)]">highlights</h2>
        <ul>
          {_package?.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default PackageOverview;
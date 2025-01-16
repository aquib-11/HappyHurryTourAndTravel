import React from "react";
import { useOutletContext } from "react-router-dom";

const PackageOverview = () => {
  const _package = useOutletContext();
  console.log({ _package });
  return (
    <div>
      <div>
        <p>{_package?.overview}</p>
      </div>
      <div>
        <h2>Tour info</h2>
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
        <h2>highlights</h2>
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
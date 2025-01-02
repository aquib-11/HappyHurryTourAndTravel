import React from "react";
import cardImg from "../../assets/images/bg7.jpg";
import { Link } from "react-router-dom";
const AllDestinationCard = () => {
  return (
    <div className="bg-transparent text-center p-2 mt-6 ">
      <img
        src={cardImg}
        alt="Dal Lake"
        className="rounded-full w-36 h-36 mx-auto"
      />
      <div className=" p-0 pt-3">
        <h5 className="font-semibold text-xl text-[var(--bs-black)]">
          <Link className="hover:text-[var(--bs-link-hover-color)]" href="">
            Pehalgam
          </Link>
        </h5>
        <p className="text-[var(--bs-secondary-text-emphasis)]">Jammu & Kashmir</p>
      </div>
    </div>
  );
};

export default AllDestinationCard;

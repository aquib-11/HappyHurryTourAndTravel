import React from "react";
import cardImg from "../../assets/images/bg5.jpg";
import { Link } from "react-router-dom";
const AllDestinationCard = () => {
  return (
    <div className="container bg-transparent text-center p-2 mt-6 ">
      <img
        src={cardImg}
        alt="Dal Lake"
        className="rounded-full w-36 h-36 mx-auto"
      />
      <div className=" p-0 pt-3">
        <h1 className="font-extrabold text-xl text-[var(--bs-white)]">
          <Link className="hover:text-[var(--bs-link-color)] transition-colors duration-300" href="">
            Pehalgam
          </Link>
        </h1>
        <p className="text-[var(--bs-gray-400)]">Jammu & Kashmir</p>
      </div>
    </div>
  );
};

export default AllDestinationCard;

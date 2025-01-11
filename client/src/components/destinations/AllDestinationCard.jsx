import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);
const AllDestinationCard = ({ destination }) => {
  const {
    destinationName,
    title,
    images,
    overview,
    _id,
    highlights,
    updatedAt,
  } = destination;
  const createDate = dayjs(updatedAt).format("MMM DD, YYYY");
  const randomImageIndex = Math.floor(Math.random() * images.length);
  const coverImage =
    images[randomImageIndex]?.image ||
    "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";
  return (
    <div className="container bg-transparent text-center p-2 mt-6 ">
      <img
        src={coverImage}
        alt={title}
        className="rounded-full w-36 h-36 mx-auto object-cover"
      />
      <div className=" p-0 pt-3">
        <h1 className="font-extrabold text-xl text-[var(--bs-white)]">
          <Link
            className="hover:text-[var(--bs-link-color)] transition-colors duration-300"
            to={`/know-about-destination/${_id}`}
          >
            {destinationName}
          </Link>
        </h1>
        <p className="text-[var(--bs-gray-400)]">{createDate}</p>
      </div>
    </div>
  );
};

export default AllDestinationCard;

import React from "react";
import customFetch from "../../../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { BookOneWayNotification } from "../../../components";

export const notificationLoader = async () => {
  try {
    const response1 = await customFetch.get("/bookOneWay");
    const response2 = await customFetch.get("/bookTwoWay");
    const response3 = await customFetch.get("/contact");
    const response4 = await customFetch.get("/bookPackage");
    const data = {
      bookOneWay: response1.data,
      bookTwoWay: response2.data,
      contact: response3.data,
      bookPackage: response4.data,
    };
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const Notification = () => {
  const data = useLoaderData();
  console.log({ data });
  return (
    <div>
      <h2 className="text-center text-[var(--bs-white)] font-sans">
        Notification
      </h2>
      {/* Book One Way notification */}
      {data?.bookOneWay?.length > 0 && (
        <BookOneWayNotification bookOneWay={data?.bookOneWay} />
      )}

      {/* Book Two Way notification */}
      {/* {data?.bookTwoWay?.length > 0 && (
        <BookOneWayNotification bookOneWay={data?.bookTwoWay} />
      )} */}

      {/* Contact notification */}
      {/* {data?.contact?.length > 0 && (
        <BookOneWayNotification bookOneWay={data?.contact} />
      )} */}

      {/* Book Package notification */}
      {/* {data?.bookPackage?.length > 0 && (
        <BookOneWayNotification bookOneWay={data?.bookPackage} />
      )} */}
    </div>
  );
};

export default Notification;

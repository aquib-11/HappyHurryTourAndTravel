import React from "react";

const BookOneWayNotification = ({ bookOneWay }) => {
  return (
    <div>
      <h4 className="text-[var(--bs-white)] font-sans">Cab Notifications</h4>
      <div>
        {bookOneWay.map((oneWay) => (
          <div key={oneWay._id} className="my-2">
            <p className="text-[var(--bs-white)] font-sans">
              Customer Name: {oneWay.customerName}
            </p>
            <p className="text-[var(--bs-white)] font-sans">
              Customer Email: {oneWay.customerEmail}
            </p>
            <p className="text-[var(--bs-white)] font-sans">
              Pickup Location: {oneWay.pickupLocation}
            </p>
            <p className="text-[var(--bs-white)] font-sans">
              Pickup Date: {oneWay.pickupDate}
            </p>
            <p className="text-[var(--bs-white)] font-sans">
              Pickup Time: {oneWay.pickupTime}
            </p>
            <p className="text-[var(--bs-white)] font-sans">
              Drop Location: {oneWay.dropLocation}
            </p>
            <p className="text-[var(--bs-white)] font-sans">
              Car Selected: {oneWay.selectCab.name}
            </p>
            <img src={oneWay.selectCab.image} alt="cab image laoding..." />

            <button>delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookOneWayNotification;

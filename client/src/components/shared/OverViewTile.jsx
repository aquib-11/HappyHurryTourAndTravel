import React from "react";

const OverViewTile = ({ title, description, icon }) => {
  return (
    <div>
      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-4 mb-4">
        <div className="flex items-center gap-3">
          {icon}
          <h2 className="text-lg md:text-3xl font-sans font-bold text-white">
            {title}
          </h2>
        </div>
        <div>
          {description && <p className="text-gray-300 ">{description}</p>}
        </div>
      </div>
    </div>
  );
};

export default OverViewTile;

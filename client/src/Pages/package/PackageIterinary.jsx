import { useOutletContext } from "react-router-dom";

const PackageIterinary = () => {
  const _package = useOutletContext();
  return (
    <div>
      <h2 className="font-sans font-semibold my-4 capitalize text-[var(--bs-white)]">Itinerary</h2>
      <ul>
        {_package?.itinerary.map((item, index) => (
          <li key={item} className="font-sans  ">
            <span className=" text-[var(--bs-white)] ">Day {index + 1} : </span> {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default PackageIterinary;
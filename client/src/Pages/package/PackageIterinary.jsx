import { useOutletContext } from "react-router-dom";

const PackageIterinary = () => {
  const _package = useOutletContext();
  return (
    <div>
      <h2>Itinerary</h2>
      <ul>
        {_package?.itinerary.map((item, index) => (
          <li key={item}>Day {index + 1} : {item}</li>
        ))}
      </ul>
    </div>
  );
};
export default PackageIterinary;
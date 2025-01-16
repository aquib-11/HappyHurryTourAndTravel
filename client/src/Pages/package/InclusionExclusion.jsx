import { useOutletContext } from "react-router-dom";

const InclusionExclusion = () => {
    const _package = useOutletContext();
  return (
    <div>
      <h2 className="font-sans font-semibold my-4 capitalize text-[var(--bs-white)]">Inclusions</h2>
      <ul className="list-disc pl-4">
        {_package?.inclusions.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <h2 className="font-sans font-semibold my-4 capitalize text-[var(--bs-white)]">Exclusions</h2>
      <ul className="list-disc pl-4">
        {_package?.exclusions.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
export default InclusionExclusion
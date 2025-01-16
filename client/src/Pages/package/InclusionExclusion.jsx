import { useOutletContext } from "react-router-dom";

const InclusionExclusion = () => {
    const _package = useOutletContext();
  return (
    <div>
      <h2>Inclusions</h2>
      <ul>
        {_package?.inclusions.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <h2>Exclusions</h2>
      <ul>
        {_package?.exclusions.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
export default InclusionExclusion
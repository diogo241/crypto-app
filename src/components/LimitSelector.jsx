const LimitSelector = ({ name, onLimitChange, options }) => {
  return (
    <div className="controls">
      <label htmlFor={name}>Show: </label>
      <select name={name} id={name} onChange={onLimitChange}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LimitSelector;

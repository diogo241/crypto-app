const FilterInput = ({ filter, onFilterChange }) => {
  return (
    <div className="filter">
      <input
        type="text"
        name="filter"
        value={filter}
        id="filter"
        placeholder="Filter coins by name or symbol"
        onChange={onFilterChange}
      />
    </div>
  );
};

export default FilterInput;

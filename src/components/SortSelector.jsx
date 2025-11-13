const SortSelector = ({name, onSortChange, options}) => {
  return (
    <div className="controls">
      <label htmlFor={name}>Sort: </label>
      <select name={name} id={name} onChange={onSortChange}>
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.name}</option>
        ))}
      </select>
    </div>
  )
}

export default SortSelector
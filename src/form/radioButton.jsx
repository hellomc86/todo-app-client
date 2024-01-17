
const RadioButton = ({ value, checkedButtonValue, buttonLabel, handleOptionChange }) => {
  return (
    <div className="block">
    
      <input
        type="radio"
        name="todo_status"
        id = {value}
        value = {value}
        checked={checkedButtonValue === value}
        onChange={handleOptionChange}
        className="form-check-input"
      />
      
      <label htmlFor= {value} className="radioButtonLabel">{buttonLabel}</label>
  </div>
  )
}

export default RadioButton
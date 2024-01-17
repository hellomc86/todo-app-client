
import RadioButton from "./radioButton";
const RadioButtonForm = ({
    selectedRadionButton, setSelectedRadionButton
}) => {
  

 const handleOptionChange = (changeEvent) => {
    setSelectedRadionButton(changeEvent.target.value);
  };

  return (
    <div className="radioGroup">

        <RadioButton value = "pending" checkedButtonValue = {selectedRadionButton}  buttonLabel = "Pending" handleOptionChange = {handleOptionChange} />
        <RadioButton value = "incomplete" checkedButtonValue = {selectedRadionButton}  buttonLabel = "Incomplete" handleOptionChange = {handleOptionChange} />
        <RadioButton value = "completed" checkedButtonValue = {selectedRadionButton}  buttonLabel = "Completed" handleOptionChange = {handleOptionChange} />      

      
      </div>
  );

};

export default RadioButtonForm;

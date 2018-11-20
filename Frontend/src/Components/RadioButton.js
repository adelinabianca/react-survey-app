import React from "react";
import InputField from './InputField';

const RadioButton = (props) => {
  return (
      <label className="radioContainer">
        {props.answer}
        <input
          type="radio"
          name="radio"
          on="true"
          value={props.answer}
          defaultChecked={props.checked}
          onChange={event => props.onChange(event)}
        />
        <span className="checkmark" />
        {props.answerType === "single with other" && props.index === props.answerOptions.length -1 && 
          <InputField checked={props.checked}
                      value={props.value}
                      onInputOptionChange={props.onInputOptionChange}/>
        } 
      </label>
  );
};

export default RadioButton;

// apply prettier; use memo for dumb components
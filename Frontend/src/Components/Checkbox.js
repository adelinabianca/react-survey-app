import React from "react";
import InputField from "./InputField";

const Checkbox = props => {
  return (
    <>
      <label className="checkboxContainer">
        {props.answer.option}
        <input
          type="checkbox"
          value={props.answer.option}
          name={props.answer.option}
          checked={props.checked}
          onChange={event => props.onChange(event)}
        />
        <span className="checkmark" />
        {props.answerType === "multiple with other" &&
          props.index === props.answerOptions.length - 1 && (
            <InputField
              checked={props.checked}
              value={props.value}
              onInputOptionChange={props.onInputOptionChange}
            />
          )}
      </label>
    </>
  );
};

export default React.memo(Checkbox);

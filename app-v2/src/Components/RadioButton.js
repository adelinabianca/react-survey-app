import React from "react";

const RadioButton = props => {
  return (
    <label className="radioContainer">
      {props.answer}
      <input
        type="radio"
        name="radio"
        on="true"
        value={props.answer}
        defaultChecked={props.checked}
        onChange={props.onChange}
      />
      <span className="checkmark" />
    </label>
  );
};

export default RadioButton;

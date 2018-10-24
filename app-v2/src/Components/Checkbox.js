import React from "react";

const Checkbox = props => {
  return (
    <label className="checkboxContainer">
      {props.answer}
      <input
        type="checkbox"
        value={props.answer}
        name={props.answer}
        checked={props.checked}
        onChange={props.onChange}
      />
      <span className="checkmark" />
    </label>
  );
};

export default Checkbox;

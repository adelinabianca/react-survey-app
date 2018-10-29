import React from "react";

const Checkbox = props => {
  return (
    <>
      <label className="checkboxContainer">
        {props.answer}
        <input
          type="checkbox"
          value={props.answer}
          name={props.answer}
          checked={props.checked}
          onChange={event => props.onChange(event, props.index)}
        />
        <span className="checkmark" />
      </label>
    </>
  );
};

export default Checkbox;

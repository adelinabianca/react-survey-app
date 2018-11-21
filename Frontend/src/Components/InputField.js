import React from "react";
import "./InputField.css";
import "./InputField.responsive.css";

const InputField = props => {
  return (
    <input
      className="inputField"
      type="text"
      key="inputCheckbox"
      name="inputOption"
      value={props.value}
      disabled={!props.checked}
      onChange={event => props.onInputOptionChange(event)}
      onBlur={event => (!props.checked ? (event.target.value = "") : null)}
    />
  );
};

export default React.memo(InputField);

import React from "react";

const RadioButton = props => {
  return (
    <>
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
      </label>
      {props.answerType === "single with other" && props.index === props.lastOptionIndex ? (
        <input
          type="text"
          key="inputRadio"
          name="inputOption"
          disabled={!props.checked}
          onChange={event => props.onInputOptionChange(event)}
          onBlur={event =>  (props.checked ? null : event.target.value = '' )}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default RadioButton;

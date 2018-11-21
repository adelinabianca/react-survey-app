import React from "react";

const Button = props => {
  const buttonText = props.buttonText;
  const buttonClassName = props.className;
  const iconClassName = props.icon;

  return (
    <button
      type="button"
      className={`btn ${buttonClassName}`}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      <i className={`fa ${iconClassName}`} />
      {buttonText}
    </button>
  );
};

export default React.memo(Button);

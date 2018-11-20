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

export default Button;

// make this a presentational / dumb component; --> done
// update to react 16.6 --> done
// and use memo() --> why? error!!

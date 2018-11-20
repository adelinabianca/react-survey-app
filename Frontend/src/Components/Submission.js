import React from "react";
import "./Submission.css";

const Submission = () => {
  return (
    <div className="submission">
      <span className="checkmark_big">
        <div className="checkmark_stem" />
        <div className="checkmark_kick" />
      </span>
      <h3>Thank you for submitting!</h3>
    </div>
  );
};

export default React.memo(Submission);

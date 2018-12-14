import React from "react";
import PropTypes from 'prop-types'; 

import "./Submission.css";

const Submission = (props) => {
  const { statistics } = props;
  const { totalNumberOfAnswers, totalsPerDcs } = statistics;

  return (
    <div className="submission">
      <span className="checkmark_big">
        <div className="checkmark_stem" />
        <div className="checkmark_kick" />
      </span>
      <h3>Thank you for submitting!</h3>
      <div className="statistics">
        <div className="tableRow withBorder">
          {totalsPerDcs.map(dc => <div className="tableCell">{dc.deliveryCenterName}</div>)}
          <div className="tableCell">Total</div>
        </div>
        <div className="tableRow">
          {totalsPerDcs.map(dc => <div className="tableCell">{dc.totalNumberOfAnswers} answer(s)</div>)}
          <div className="tableCell">{totalNumberOfAnswers} answer(s)</div>
        </div>
      </div>
    </div>
  );
};

Submission.PropTypes = {
  statistics: PropTypes.object
}
Submission.defaultProps = {
  statistics: {
    "totalNumberOfAnswers": 0,
    "totalsPerDcs": [
      {
        "deliveryCenterName": "Iasi",
        "totalNumberOfAnswers": 0
      }
    ]
  }
}

export default React.memo(Submission);

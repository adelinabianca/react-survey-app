import React, { Component } from "react";

import { GET_STATISTICS_URL } from './../config/config'
import Spinner from './Spinner';
import "./Submission.css";

class Submission extends Component {
  state = {
    statistics: {},
    loading: true
  }
  
  componentDidMount() {
    const statisticsUrl = `${GET_STATISTICS_URL}`;

    fetch(statisticsUrl)
        .then(data => data.json())
        .then(data => {
          this.setState({statistics: data, loading: false})
        })
        .catch(err => console.log(err))
  }

  renderStatistics = () => {
    const { loading, statistics } = this.state;
    let statisticsTable = <Spinner />;
    if (!loading) {
      const { totalNumberOfAnswers, totalsPerDcs } = statistics;
      statisticsTable = (
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
      )
    }
    return statisticsTable;
  }

  render() {
    
    return (
      <div className="submission">
        <span className="checkmark_big">
          <div className="checkmark_stem" />
          <div className="checkmark_kick" />
        </span>
        <h3>Thank you for submitting!</h3>
        {this.renderStatistics()}
      </div>
    );
  }
};

export default Submission;

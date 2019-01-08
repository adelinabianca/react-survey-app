import React, { Component } from "react";

import { GET_STATISTICS_URL } from './../config/config'
import Spinner from './Spinner';
import "./Submission.css";
import Bar from './Pie'

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
      const { totalsPerDcs } = statistics;
	  statisticsTable = (
      <div className="statistics">
        {totalsPerDcs.map((dcs) => (
            <div key={dcs.deliveryCenterName} className="pieChart">{dcs.deliveryCenterName}<Bar  statistics={dcs} /> </div>)
          )}
      </div>
      );
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

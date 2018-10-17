import React, { Component } from 'react'

export class Checkbox extends Component {
  render() {
      const answer = this.props.answer;
    return (
        <label className="checkboxContainer">{answer}
            <input type="checkbox" />
            <span className="checkmark"></span>
        </label>
    )
  }
}

export default Checkbox;

import React, { Component } from 'react'

export class RadioButton extends Component {
    render() {
        const answer = this.props.answer;
      return (
          <label className="radioContainer">{answer}
              <input type="radio" name="radio" on="true" />
              <span className="checkmark"></span>
          </label>
      )
    }
}

export default RadioButton;

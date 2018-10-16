import React, { Component } from 'react'

export class Checkbox extends Component {
  render() {
      const answer = this.props.answer;
    return (
        <label class="checkboxContainer">{answer}
            <input type="checkbox" />
            <span class="checkmark"></span>
        </label>
    )
  }
}

export default Checkbox;

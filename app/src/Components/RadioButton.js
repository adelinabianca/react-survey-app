import React, { Component } from 'react'

export class RadioButton extends Component {
    render() {
        const answer = this.props.answer;
        const isChecked = this.props.checked
        return (
            <label className="radioContainer">{answer}
                <input type="radio" name="radio" on="true" value={answer} defaultChecked={isChecked} onChange={this.props.onChange} />
                <span className="checkmark"></span>
            </label>
        )
    }
}

export default RadioButton;

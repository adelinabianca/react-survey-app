import React, { Component } from 'react'
import { RadioButton } from './RadioButton';

export class RadioButtonList extends Component {
    answers = this.props.answers;
    render() {
        return (
            <div className="col-12 cold-md-8 question-options">
                <div className="align-left">
                    {this.answers.map(answer => (
                        <RadioButton answer={answer} />
                    ))}
                </div>
            </div>
        )
    }
}

export default RadioButtonList;

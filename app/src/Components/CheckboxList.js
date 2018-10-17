import React, { Component } from 'react';
import { Checkbox } from './Checkbox';

export class CheckboxList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checkedAnswers: new Map()
        };
        this.handleChange = this.handleChange.bind(this);
    }
    answers = this.props.answers;
    handleChange(e) {
        const answer = e.target.name;
        const isChecked = e.target.checked;
        this.setState( prevState => ({checkedAnswers: prevState.checkedAnswers.set(answer, isChecked)}));
    }
    render() {
        return (
            <div className="col-12 cold-md-8 question-options">
                <div className="align-left">
                        {this.answers.map((answer) => (
                            <Checkbox answer={answer} checked={this.state.checkedAnswers.get(answer.name)} onChange={this.handleChange} />
                        ))}
                </div>
            </div>
        )
    }
}

export default CheckboxList;

import React, { Component } from 'react'
import { RadioButton } from './RadioButton';

export class RadioButtonList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checkedAnswer: {questionId: '', answers: ''}
        };
    }
    
    componentWillMount() {
        this.setState({checkedAnswer: this.props.previousAnswer})
    }

    handleChange = (e) => {
        this.setState({checkedAnswer: e.target.value}, () => {this.props.saveAnswers(this.state.checkedAnswer)});
        
    }

    // checkIfAnswerWasChecked = (answer) => {
    //     const {previousAnswer} = this.props;
    //     if(previousAnswer !== null ) {
    //         previousAnswer.forEach(prevAnswer => {
    //         if(prevAnswer.answers[0] === answer) {
    //             this.setState({checkedAnswer: [answer]});
    //             return true;
    //         }
    //      });
    //      }
    //      return false;
    // }

    render() {
        const answerOptions = this.props.answerOptions;
        return ( 
            <div className="col-12 cold-md-8 question-options">
                <div className="align-left">
                    {answerOptions.map((answer, index) => (
                        <RadioButton 
                                key={index}
                                answer={answer} 
                                checked={typeof this.props.previousAnswer !== 'undefined' ? this.props.previousAnswer.answers === answer: false}
                                onChange={this.handleChange} />
                    ))}
                </div>
            </div>
        )
    }
}

export default RadioButtonList;

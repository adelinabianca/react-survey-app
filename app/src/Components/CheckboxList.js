import React, { Component } from 'react';
import { Checkbox } from './Checkbox';

export class CheckboxList extends Component {
    constructor(props) {
        super(props);
         
        this.state = {
            checkedAnswers: []
        };
    }
    
    componentWillMount() {
        this.setState({checkedAnswers: typeof this.props.previousAnswer !== 'undefined' ? this.props.previousAnswer.answers[0] : []})
        // this.setState({checkedAnswers: this.props.previousAnswer.length !== 0 ? this.props.previousAnswer.answers : []})
    }

    handleChange = (event) => {
        const answer = event.target.name;
        const isChecked = event.target.checked;
        const { saveAnswers } = this.props;
        if (isChecked) {
            this.setState( prevState => ({checkedAnswers: [...prevState.checkedAnswers, answer]}), () => { saveAnswers(this.state.checkedAnswers) });
        } else {
            this.setState( prevState => ({checkedAnswers: prevState.checkedAnswers.filter( item => item !== answer)}), () => { saveAnswers(this.state.checkedAnswers); });
        }
    }

    // checkIfAnswerWasChecked = (answer) => {
    //     const {previousAnswer} = this.props;
    //     if(previousAnswer !== null ) {
    //         previousAnswer.forEach(prevAnswer => {
    //         console.log(prevAnswer)
    //         if(prevAnswer.answers === answer) {
    //             return true;
    //         }
    //      });
    //      return false;
    //      }
    //     return false;
    // }
    
    render() {
        const { answerOptions } = this.props;
        console.log(this.props.previousAnswer)
        return (
            <div className="col-12 cold-md-8 question-options">
                <div className="align-left">
                        {answerOptions.map((answer, index) => (
                            <Checkbox key={index} 
                                    answer={answer} 
                                    // checked={this.props.previousAnswer.length !== 0 ? this.props.previousAnswer.answers.indexOf(answer) > -1 : false } 
                                    checked={typeof this.props.previousAnswer !== 'undefined' ? this.props.previousAnswer.answers[0].indexOf(answer) > -1 : false } 
                                    onChange={this.handleChange} 
                            />
                        ))}
                </div>
            </div>
        )
    }
}

export default CheckboxList;

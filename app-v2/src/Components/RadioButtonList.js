import React, { Component } from 'react';
import RadioButton from './RadioButton';

import InputField from './InputField';

export class RadioButtonList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checkedAnswer: '',
            inputAnswer: ''
        };

    }
    componentWillMount() {
        if(this.props.previousAnswer !== ''){
            this.setState({checkedAnswer: this.props.previousAnswer.answers.includes('Other:') ? 
                                            this.props.answerOptions[this.props.answerOptions.length -1] : 
                                                this.props.previousAnswer.answers,
                           inputAnswer: this.props.previousAnswer.answers.includes('Other:') ? 
                                            this.props.previousAnswer.answers.substring(7) : 
                                                ''
                          });
        }
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.previousAnswer !== nextProps.previousAnswer || this.props.answerOptions !== nextProps.answerOptions) {
            this.setState({checkedAnswer: nextProps.previousAnswer !== '' ? 
                                            (nextProps.previousAnswer.answers.includes('Other:') ? nextProps.answerOptions[nextProps.answerOptions.length -1] : nextProps.previousAnswer.answers) : 
                                                '',
                            inputAnswer: nextProps.previousAnswer !== '' ? 
                                            (nextProps.previousAnswer.answers.includes('Other:') ? nextProps.previousAnswer.answers.substring(7): '') :
                                                ''
                          });
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if(this.state !== nextState) {
            return true;
        }
        return false
    }
    handleChange = (event) => {
        this.setState({checkedAnswer: event.target.value}, () => this.props.saveAnswers(this.state.checkedAnswer));
    }
    handleInputOptionChange = (event) => {
        this.setState({inputAnswer: event.target.value}, () => this.props.saveAnswers('Other: ' + this.state.inputAnswer));
    }
    
  render() {
    const { answerOptions } = this.props;
    return ( 
        <div className="col-12 cold-md-8 question-options">
            <div className="align-left">
                {answerOptions.map((answer, index) => (
                    <React.Fragment key={answer + index + 'radio'}>
                        <RadioButton 
                                answer={answer} 
                                checked={this.state.checkedAnswer ===  answer }
                                onChange={this.handleChange}
                        />
                        {this.props.answerType === "single with other" && index === answerOptions.length -1 && 
                                <InputField checked={this.state.checkedAnswer ===  answer}
                                            value={this.state.inputAnswer}
                                            onInputOptionChange={this.handleInputOptionChange}/>} 
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
  }
}

export default RadioButtonList;

import React, { Component } from 'react';
import RadioButton from './RadioButton';

export class RadioButtonList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checkedAnswer: '',
            inputAnswer: ''
        };
        
    }
     inputAnswer = ''
    componentWillMount() {
        if(this.props.previousAnswer !== ''){
            this.setState({checkedAnswer: this.props.previousAnswer.answers})
        }
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.previousAnswer !== nextProps.previousAnswer || this.props.answerOptions !== nextProps.answerOptions) {
            this.setState({checkedAnswer: nextProps.previousAnswer !== '' ? nextProps.previousAnswer.answers : ''})
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if(this.state !== nextState) {
            return true;
        }
        return false
    }
    handleChange = (event) => {
        this.setState({checkedAnswer: event.target.value, inputAnswer: ''}, () => this.props.saveAnswers(this.state.checkedAnswer));
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
                    <RadioButton 
                            key={answer + index + 'radio'}
                            answer={answer} 
                            checked={this.state.checkedAnswer ===  answer }
                            onChange={this.handleChange}
                            onInputOptionChange={this.handleInputOptionChange}
                            answerType={this.props.answerType} 
                            index={index}
                            lastOptionIndex={answerOptions.length - 1}
                    />
                ))}
            </div>
        </div>
    )
  }
}

export default RadioButtonList;

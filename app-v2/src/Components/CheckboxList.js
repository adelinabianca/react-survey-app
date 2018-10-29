import React, { Component } from 'react';
import  Checkbox  from './Checkbox';
import InputField  from './InputField';

export class CheckboxList extends Component {
    constructor(props) {
        super(props);
         
        this.state = {
            checkedAnswers: [],
            inputAnswer: ''
        };
    }
    componentWillMount() {
        if(this.props.previousAnswer !== ''){
            this.setState({checkedAnswers: this.props.previousAnswer.answers, 
                           inputAnswer: this.props.previousAnswer.answers.filter(prevAnswer => prevAnswer.includes('Other:')).map(e => e.substring(7))[0]})
        }
        
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.previousAnswer !== nextProps.previousAnswer || this.props.answerOptions !== nextProps.answerOptions) {
            this.setState({checkedAnswers: nextProps.previousAnswer !== '' ? nextProps.previousAnswer.answers : [],
                            inputAnswer: nextProps.previousAnswer !== '' ? 
                                            nextProps.previousAnswer.answers.filter(prevAnswer => prevAnswer.includes('Other:')).map(e => e.substring(7))[0] : 
                                                []
                          })
        }
    }


    handleChange = (event) => {
        const answer = event.target.value;
        const isChecked = event.target.checked;
        
        if(isChecked) {
            this.setState(prevState => ({checkedAnswers: [...prevState.checkedAnswers, answer]}), () => this.props.saveAnswers(this.state.checkedAnswers))
        }
        else {
            this.setState(prevState => ({checkedAnswers: prevState.checkedAnswers.filter( prevAnswer => prevAnswer !== answer)}), () => this.props.saveAnswers(this.state.checkedAnswers))
        }
    }
    handleInputOptionChange = (event) => {
        let updatedCheckedAnswers =  this.state.checkedAnswers;
        let indexOfOtherOption = updatedCheckedAnswers.indexOf(updatedCheckedAnswers.filter(answer => answer.includes('Other:'))[0]);
        indexOfOtherOption !== -1 ? updatedCheckedAnswers[indexOfOtherOption] = 'Other: ' + event.target.value : updatedCheckedAnswers = updatedCheckedAnswers.concat('Other: ' + event.target.value );
        this.setState({checkedAnswers: updatedCheckedAnswers, inputAnswer: event.target.value}, () => this.props.saveAnswers(this.state.checkedAnswers))
    }
    
  render() {
    const { answerOptions } = this.props;
    return (
        <div className="col-12 cold-md-8 question-options">
            <div className="align-left">
                    {answerOptions.map((answer, index) => (
                        <React.Fragment key={answer + index + 'checkbox'}>
                            <Checkbox  
                                    answer={answer}
                                    checked={this.state.checkedAnswers.indexOf(answer) > -1}
                                    onChange={this.handleChange}
                            />
                            {this.props.answerType === "multiple with other" && index === answerOptions.length -1 && 
                            <InputField checked={this.state.checkedAnswers.indexOf(answer) > -1}
                                        value={this.state.inputAnswer}
                                        onInputOptionChange={this.handleInputOptionChange}/>} 
                        </React.Fragment>
                    ))}
            </div>
        </div>
    )
  }
}

export default CheckboxList;

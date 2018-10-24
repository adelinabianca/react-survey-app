import React, { Component } from 'react';
import  Checkbox  from './Checkbox';

export class CheckboxList extends Component {
    constructor(props) {
        super(props);
         
        this.state = {
            checkedAnswers: []
        };
    }
    componentWillMount() {
        if(this.props.previousAnswer !== ''){
            this.setState({checkedAnswers: this.props.previousAnswer.answers})
        }
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.previousAnswer !== nextProps.previousAnswer || this.props.answerOptions !== nextProps.answerOptions) {
            this.setState({checkedAnswers: nextProps.previousAnswer !== '' ? nextProps.previousAnswer.answers : []})
        }
    }

    handleChange = (event) => {
        const answer = event.target.name;
        const isChecked = event.target.checked;
        
        if(isChecked) {
            this.setState(prevState => ({checkedAnswers: [...prevState.checkedAnswers, answer]}), () => this.props.saveAnswers(this.state.checkedAnswers))
        }
        else {
            this.setState(prevState => ({checkedAnswers: prevState.checkedAnswers.filter( prevAnswer => prevAnswer !== answer)}), () => this.props.saveAnswers(this.state.checkedAnswers))
        }
    }
    
  render() {
    const { answerOptions } = this.props;
    return (
        <div className="col-12 cold-md-8 question-options">
            <div className="align-left">
                    {answerOptions.map((answer, index) => (
                        <Checkbox key={new Date().getTime() + index} 
                                answer={answer}
                                checked={this.state.checkedAnswers.indexOf(answer) > -1}
                                onChange={this.handleChange}
                        />
                    ))}
            </div>
        </div>
    )
  }
}

export default CheckboxList;

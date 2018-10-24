import React, { Component } from 'react';
import RadioButton from './RadioButton';

export class RadioButtonList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checkedAnswer: ''
        };
    }
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
    handleChange = (event) => {
        this.setState({checkedAnswer: event.target.value}, () => this.props.saveAnswers(this.state.checkedAnswer));
    }
    
  render() {
    const { answerOptions } = this.props;
    return ( 
        <div className="col-12 cold-md-8 question-options">
            <div className="align-left">
                {answerOptions.map((answer, index) => (
                    <RadioButton 
                            key={new Date().getTime() + index}
                            answer={answer} 
                            checked={this.state.checkedAnswer ===  answer }
                            // checked={this.props.previousAnswer !== '' ? this.props.previousAnswer.answers === answer : this.state.checkedAnswer === answer}
                            onChange={this.handleChange} 
                    />
                ))}
            </div>
        </div>
    )
  }
}

export default RadioButtonList;

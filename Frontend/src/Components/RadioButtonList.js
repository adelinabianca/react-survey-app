import React, { Component } from 'react';
import RadioButton from './RadioButton';



export class RadioButtonList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checkedAnswer: [],
            inputAnswer: ''
        };

    }
    componentWillMount() {
        // use object destructing for props
        if(this.props.previousAnswer.answers.length !== 0){
            this.setState({checkedAnswer: this.props.previousAnswer.answers[0].includes('Other:') ? 
                                            [this.props.answerOptions[this.props.answerOptions.length -1]] : 
                                                this.props.previousAnswer.answers,
                           inputAnswer: this.props.previousAnswer.answers[0].includes('Other:') ? 
                                            this.props.previousAnswer.answers[0].substring(7) : 
                                                ''
                          });
        }
    }
    componentWillReceiveProps(nextProps) {
        // use object destructing for props
        if(this.props.previousAnswer !== nextProps.previousAnswer || this.props.answerOptions !== nextProps.answerOptions) {
            this.setState({checkedAnswer: nextProps.previousAnswer.answers.length !== 0 ? 
                                            (nextProps.previousAnswer.answers[0].includes('Other:') ? [nextProps.answerOptions[nextProps.answerOptions.length -1]] : nextProps.previousAnswer.answers) : 
                                                [],
                            inputAnswer: nextProps.previousAnswer.answers.length !== 0 ? 
                                            (nextProps.previousAnswer.answers[0].includes('Other:') ? nextProps.previousAnswer.answers[0].substring(7): '') :
                                                ''
                          });
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if(this.state !== nextState) {
            return true;
        }
        return false
        // not needed; see PureComponent
    }
    handleChange = (event) => {
        this.setState({checkedAnswer: [event.target.value]}, () => this.props.saveAnswers(this.state.checkedAnswer));
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
                                checked={this.state.checkedAnswer[0] ===  answer }
                                onChange={this.handleChange}
                                value={this.state.inputAnswer}
                                onInputOptionChange={this.handleInputOptionChange}
                                answerType={this.props.answerType}
                                answerOptions={answerOptions}
                                index={index}
                                // use object spread for passing props
                        />
                ))}
            </div>
        </div>
    )
  }
}

export default RadioButtonList;

// apply same rules as everywhere
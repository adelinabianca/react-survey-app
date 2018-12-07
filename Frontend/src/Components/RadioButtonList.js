import React, { PureComponent } from "react";
import RadioButton from "./RadioButton";

export class RadioButtonList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      checkedAnswer: [{option: '', goTo: ''}],
      inputAnswer: ""
    };
  }

  componentWillMount() {
    const { previousAnswer, answerOptions, questionId } = this.props;
    console.log(previousAnswer)
    if (previousAnswer !== '' && previousAnswer.questionId === questionId) {
      this.setState({
        checkedAnswer: previousAnswer.answers[0].option.includes("Other:")
          ? [answerOptions[answerOptions.length - 1]]
          : previousAnswer.answers,
        inputAnswer: previousAnswer.answers[0].option.includes("Other:")
          ? previousAnswer.answers[0].option.substring(7)
          : ""
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { previousAnswer, answerOptions } = this.props;
    
    if (previousAnswer !== nextProps.previousAnswer || answerOptions.map(answer => answer.option) !== nextProps.answerOptions.map(answer => answer.option)) {
      this.setState({
        checkedAnswer:
          nextProps.previousAnswer.answers[0].option.length !== 0
            ? nextProps.previousAnswer.answers[0].option.includes("Other:")
              ? [nextProps.answerOptions[nextProps.answerOptions.length - 1]]
              : nextProps.previousAnswer.answers
            : [],
        inputAnswer:
          nextProps.previousAnswer.answers[0].option.length !== 0
            ? nextProps.previousAnswer.answers[0].option.includes("Other:")
              ? nextProps.previousAnswer.answers[0].option.substring(7)
              : ""
            : ""
      });
    }
  }

  handleChange = event => {
    this.setState({ checkedAnswer: [{option: event.target.value, goTo: ''}] }, () =>
      this.props.saveAnswers(this.state.checkedAnswer)
    );
  };

  handleInputOptionChange = event => {
    this.setState({ inputAnswer: event.target.value }, () =>
      this.props.saveAnswers({option: "Other: " + this.state.inputAnswer, goTo:''})
    );
  };

  render() {
    const { answerOptions, answerType } = this.props;
    console.log(this.state.checkedAnswer)
    return (
      <div className="col-12 cold-md-8 question-options">
        <div className="align-left">
          {answerOptions.map((answer, index) => (
            <RadioButton
              key={answer.option + index + "radio"}
              checked={this.state.checkedAnswer.option === answer.option}
              onChange={this.handleChange}
              value={this.state.inputAnswer}
              onInputOptionChange={this.handleInputOptionChange}
              {...{ index, answerOptions, answerType, answer }}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default RadioButtonList;

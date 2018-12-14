import React, { PureComponent } from "react";
import RadioButton from "./RadioButton";

export class RadioButtonList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      checkedAnswer: [],
      inputAnswer: ""
    };
  }

  componentWillMount() {
    const { previousAnswer, answerOptions, questionId } = this.props;

    if (previousAnswer.answers.length !== 0 && previousAnswer.questionId === questionId) {
      this.setState({
        checkedAnswer: previousAnswer.answers[0].includes("Other:")
          ? [answerOptions[answerOptions.length - 1]]
          : previousAnswer.answers,
        inputAnswer: previousAnswer.answers[0].includes("Other:")
          ? previousAnswer.answers[0].substring(7)
          : ""
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { previousAnswer, answerOptions } = this.props;
    if (previousAnswer !== nextProps.previousAnswer || answerOptions !== nextProps.answerOptions) {
      this.setState({
        checkedAnswer:
          nextProps.previousAnswer.answers.length !== 0
            ? nextProps.previousAnswer.answers[0].includes("Other:")
              ? [nextProps.answerOptions[nextProps.answerOptions.length - 1]]
              : nextProps.previousAnswer.answers
            : [],
        inputAnswer:
          nextProps.previousAnswer.answers.length !== 0
            ? nextProps.previousAnswer.answers[0].includes("Other:")
              ? nextProps.previousAnswer.answers[0].substring(7)
              : ""
            : ""
      });
    }
  }

  handleChange = event => {
    this.setState({ checkedAnswer: [event.target.value] }, () =>
      this.props.saveAnswers(this.state.checkedAnswer)
    );
  };

  handleInputOptionChange = event => {
    this.setState({ inputAnswer: event.target.value }, () =>
      this.props.saveAnswers(["Other: " + this.state.inputAnswer])
    );
  };

  render() {
    const { answerOptions, answerType } = this.props;
    return (
      <div className="col-12 cold-md-8 question-options">
        <div className="align-left">
          {answerOptions.map((answer, index) => (
            <RadioButton
              key={answer + index + "radio"}
              checked={this.state.checkedAnswer[0] === answer}
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

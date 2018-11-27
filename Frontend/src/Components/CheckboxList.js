import React, { Component } from "react";
import Checkbox from "./Checkbox";

export class CheckboxList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedAnswers: [],
      inputAnswer: ""
    };
  }

  componentWillMount() {
    const { previousAnswer, questionId } = this.props;

    if (previousAnswer.answers.length !== 0 && previousAnswer.questionId === questionId) {
      this.setState({
        checkedAnswers: previousAnswer.answers,
        inputAnswer: previousAnswer.answers
          .filter(prevAnswer => prevAnswer.includes("Other:"))
          .map(e => e.substring(7))[0]
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.previousAnswer !== nextProps.previousAnswer ||
      this.props.answerOptions !== nextProps.answerOptions
    ) {
      this.setState({
        checkedAnswers:
          nextProps.previousAnswer.answers.length !== 0 ? nextProps.previousAnswer.answers : [],
        inputAnswer:
          nextProps.previousAnswer.answers.length !== 0
            ? nextProps.previousAnswer.answers
                .filter(prevAnswer => prevAnswer.includes("Other:"))
                .map(e => e.substring(7))[0]
            : []
      });
    }
  }

  handleChange = event => {
    const answer = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      this.setState(
        prevState => ({
          checkedAnswers: [...prevState.checkedAnswers, answer]
        }),
        () => this.props.saveAnswers(this.state.checkedAnswers)
      );
    } else {
      this.setState(
        prevState => ({
          checkedAnswers: prevState.checkedAnswers.filter(
            prevAnswer =>
              prevAnswer !== answer && (answer === "Other" ? !prevAnswer.includes("Other:") : true)
          )
        }),
        () => this.props.saveAnswers(this.state.checkedAnswers)
      );
    }
  };

  handleInputOptionChange = event => {
    let updatedCheckedAnswers = this.state.checkedAnswers;
    let indexOfOtherOption = updatedCheckedAnswers.indexOf(
      updatedCheckedAnswers.filter(answer => answer.includes("Other:"))[0]
    );

    if (indexOfOtherOption !== -1) {
      updatedCheckedAnswers[indexOfOtherOption] = "Other: " + event.target.value;
    } else {
      updatedCheckedAnswers = updatedCheckedAnswers.concat("Other: " + event.target.value);
    }

    this.setState(
      {
        checkedAnswers: updatedCheckedAnswers,
        inputAnswer: event.target.value
      },
      () => this.props.saveAnswers(this.state.checkedAnswers)
    );
  };

  render() {
    const { answerOptions, answerType } = this.props;
    const { checkedAnswers, inputAnswer } = this.state;
    return (
      <div className="col-12 cold-md-8 question-options">
        <div className="align-left">
          {answerOptions.map((answer, index) => (
            <Checkbox
              key={answer + index + "checkbox"}
              checked={checkedAnswers.indexOf(answer) > -1}
              onChange={this.handleChange}
              value={inputAnswer}
              onInputOptionChange={this.handleInputOptionChange}
              {...{ answer, index, answerOptions, answerType }}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default CheckboxList;

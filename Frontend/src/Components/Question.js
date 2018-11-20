import React, { Component } from "react";

import { CheckboxList } from "./CheckboxList";
import { RadioButtonList } from "./RadioButtonList";
import { Textarea } from "./Textarea";
import { Button } from "./Button";
import Submission from "./Submission";

export class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionAnswers: { questionId: "", answers: [] }
    };
  }
  // one empty line
  saveAnswers = chosenAnswers => {
    this.setState({
      questionAnswers: { questionId: this.props.question.id, answers: chosenAnswers }
    });
  };

  showAnswerOptions(answerType, answerOptions) {
    if (answerType === "single" || answerType === "single with other") {
      return (
        <RadioButtonList
          answerOptions={answerOptions}
          saveAnswers={this.saveAnswers}
          previousAnswer={this.props.previousAnswer}
          answerType={answerType}
        />
      );
    }
    if (answerType === "multiple" || answerType === "multiple with other") {
      return (
        <CheckboxList
          answerOptions={answerOptions}
          saveAnswers={this.saveAnswers}
          previousAnswer={this.props.previousAnswer}
          answerType={answerType}
        />
      );
    }
    return (
      <Textarea
        saveAnswers={this.saveAnswers}
        previousAnswer={this.props.previousAnswer}
        questionIndex={this.props.questionIndex}
      />
    );
  }
  //one empty line
  onNextButtonClicked = () => {
    if (
      (this.props.previousAnswer.questionId === this.state.questionAnswers.questionId &&
        this.props.previousAnswer.answers !== this.state.questionAnswers.answers) ||
      this.props.previousAnswer.questionId.length === 0
    ) {
      this.props.onSubmitQuestionnaire(this.state.questionAnswers);
    } else {
      this.props.saveQuestionAnswer(this.state.questionAnswers);
    }
    this.props.checkIfNextQuestionHasAnswer();
    this.props.goToNextQuestion();
  };
  // one empty line everywhere
  onPreviousButtonClicked = () => {
    if (
      (this.props.previousAnswer.questionId === this.state.questionAnswers.questionId &&
        this.props.previousAnswer.answers !== this.state.questionAnswers.answers) ||
      this.props.previousAnswer.questionId.length === 0
    ) {
      this.props.onSubmitQuestionnaire(this.state.questionAnswers);
    } else {
      this.props.saveQuestionAnswer(this.state.questionAnswers);
    }
    this.props.checkIfPreviousQuestionHasAnswer();
    this.props.goToPreviousQuestion();
  };
  onSubmit = () => {
    const { onSubmitQuestionnaire } = this.props;
    onSubmitQuestionnaire(this.state.questionAnswers);
    this.props.goToNextQuestion();
  };

  showComponent() {
    if (this.props.questionIndex <= this.props.lastQuestionIndex) { 
      // stop writing this.props everytime, use object destructuring: const { questionIndex, lastQuestionIndex, samd } = this.props;
      const { question } = this.props;
      const isDisabled = !(
        (this.props.question.id === this.state.questionAnswers.questionId &&
          this.state.questionAnswers.answers.length !== 0) ||
        (this.props.previousAnswer !== "" &&
          this.props.question.id !== this.state.questionAnswers.questionId &&
          this.props.previousAnswer.answers.length !== 0)
      );
      return (
        <div>
          <div className="question">
            <h2 className="pb-3 pt-3 mbr-fonts-style display-2">{this.props.question.question}</h2>
            <h3 className="mbr-section-subtitle align-center mbr-light mbr-fonts-style display-7 pb-2 pt-2 pl-2 pr-2 mb-4">
              {this.props.question.description}
            </h3>
            {this.showAnswerOptions(question.answerType, question.answerOptions)}
          </div>
          <div className="media-container-row buttonPadding buttons">
            <Button
              buttonText="Previous"
              className={
                "previousAction btn-prev " + (this.props.questionIndex === 0 ? "hidden" : "")
              }
              icon="fa-chevron-left"
              onClick={this.onPreviousButtonClicked}
            />
            <Button
              className={
                "nextAction btn-next " +
                (this.props.questionIndex === this.props.lastQuestionIndex ? "hidden" : "")
              }
              buttonText="Next"
              disabled={isDisabled}
              icon="fa-chevron-right"
              onClick={this.onNextButtonClicked}
            />
            <Button
              className={
                "submitAction btn-next " +
                (!(this.props.questionIndex === this.props.lastQuestionIndex) ? "hidden" : "")
              }
              buttonText="Submit"
              disabled={isDisabled}
              icon="fa-share-square"
              onClick={this.onSubmit}
            />
          </div>
        </div>
      );
    } else {
      return <Submission />;
    }
  }

  render() {
    return this.showComponent();
  }
}

export default Question;


// apply prettier formatting everywhere
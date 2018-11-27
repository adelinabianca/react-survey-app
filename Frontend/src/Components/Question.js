import React, { Component } from "react";

import { CheckboxList } from "./CheckboxList";
import { RadioButtonList } from "./RadioButtonList";
import { Textarea } from "./Textarea";
import Button from "./Button";
import Submission from "./Submission";

export class Question extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionAnswers: { questionId: "", answers: [] }
    };
  }

  saveAnswers = chosenAnswers => {
    this.setState({
      questionAnswers: { questionId: this.props.question.id, answers: chosenAnswers }
    });
  };

  showAnswerOptions(answerType, answerOptions) {
    const { previousAnswer, questionIndex } = this.props;
    const {
      question: { id }
    } = this.props;

    if (answerType === "single" || answerType === "single with other") {
      return (
        <RadioButtonList
          saveAnswers={this.saveAnswers}
          questionId={id}
          {...{ answerType, previousAnswer, answerOptions }}
        />
      );
    }

    if (answerType === "multiple" || answerType === "multiple with other") {
      return (
        <CheckboxList
          saveAnswers={this.saveAnswers}
          questionId={id}
          {...{ answerType, previousAnswer, answerOptions }}
        />
      );
    }

    return <Textarea saveAnswers={this.saveAnswers} {...{ previousAnswer, questionIndex }} />;
  }

  onNextButtonClicked = () => {
    const {
      previousAnswer,
      onSubmitQuestionnaire,
      saveQuestionAnswer,
      checkIfNextQuestionHasAnswer,
      goToNextQuestion
    } = this.props;

    if (
      (previousAnswer.questionId === this.state.questionAnswers.questionId &&
        previousAnswer.answers !== this.state.questionAnswers.answers) ||
      previousAnswer.questionId.length === 0
    ) {
      onSubmitQuestionnaire(this.state.questionAnswers);
    } else {
      saveQuestionAnswer(this.state.questionAnswers);
    }
    checkIfNextQuestionHasAnswer();
    goToNextQuestion();
  };

  onPreviousButtonClicked = () => {
    const {
      previousAnswer,
      onSubmitQuestionnaire,
      saveQuestionAnswer,
      checkIfPreviousQuestionHasAnswer,
      goToPreviousQuestion
    } = this.props;

    if (
      (previousAnswer.questionId === this.state.questionAnswers.questionId &&
        previousAnswer.answers !== this.state.questionAnswers.answers) ||
      previousAnswer.questionId.length === 0
    ) {
      onSubmitQuestionnaire(this.state.questionAnswers);
    } else {
      saveQuestionAnswer(this.state.questionAnswers);
    }
    checkIfPreviousQuestionHasAnswer();
    goToPreviousQuestion();
  };

  onSubmit = () => {
    const { onSubmitQuestionnaire, goToNextQuestion } = this.props;
    onSubmitQuestionnaire(this.state.questionAnswers);
    goToNextQuestion();
  };

  showComponent() {
    const { question, questionIndex, lastQuestionIndex, previousAnswer } = this.props;

    if (questionIndex <= lastQuestionIndex) {
      const isDisabled = !(
        (question.id === this.state.questionAnswers.questionId &&
          this.state.questionAnswers.answers.length !== 0) ||
        (previousAnswer !== "" &&
          question.id !== this.state.questionAnswers.questionId &&
          previousAnswer.answers.length !== 0)
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

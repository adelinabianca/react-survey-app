import React, { Component } from 'react'
import { Button } from './Button';
import { CheckboxList } from './CheckboxList';
import { RadioButtonList } from './RadioButtonList';
import { Textarea } from './Textarea';

export class Question extends Component {
    constructor(props) {
        super(props);
        this.state = { questionAnswers: [] };
    }

    saveAnswers = (chosenAnswers) => {
        
        this.setState({ questionAnswers: {questionId: this.props.question.id, answers: chosenAnswers}});
    }

    showAnswerOptions(answerType, answerOptions) {
        if (answerType === 'single') {
            return <RadioButtonList saveAnswers={this.saveAnswers}  answerOptions={answerOptions} previousAnswer={this.props.previousAnswer[0]} />
        }
        if (answerType === 'multiple') {
            return <CheckboxList saveAnswers={this.saveAnswers} answerOptions={answerOptions} previousAnswer={this.props.previousAnswer[0]} />
        }
        return <Textarea saveAnswers={this.saveAnswers} previousAnswer={this.props.previousAnswer} />;
    }

    onPreviousButtonClicked = () => {
        const { goToPreviousQuestion, checkIfQuestionHasAnswer} = this.props;
        checkIfQuestionHasAnswer();
        goToPreviousQuestion();
    }

    onNextButtonClicked = () => {
        const { goToNextQuestion, saveQuestionAnswer, checkIfQuestionHasAnswer } = this.props;
        
        saveQuestionAnswer(this.state.questionAnswers);
        // checkIfQuestionHasAnswer();
        goToNextQuestion();
    }
    onSubmit = () => {
        const { saveQuestionAnswer } = this.props;
        saveQuestionAnswer(this.state.questionAnswers);
    }

    render() {
        const question = this.props.question;
        const answerOptions = question.answerOptions;
        const answerType = question.answerType;
        const questionIndex = this.props.questionIndex;

        return (
            <div className="questionSection ">
                <div className="media-container-row">
                    <div className="title col-12 col-md-10">
                        <div className="question">
                            <h2 className="pb-3 pt-3 mbr-fonts-style display-2">
                                {question.question}
                            </h2>
                            <h3 className="mbr-section-subtitle align-center mbr-light mbr-fonts-style display-7 pb-2 pt-2 pl-2 pr-2 mb-4">
                                {question.subtitle}
                            </h3>
                            {this.showAnswerOptions(answerType, answerOptions)}
                             <div className="media-container-row buttonPadding">
                                 <Button onPreviousButtonClicked={this.onPreviousButtonClicked}
                                    questionIndex={questionIndex}
                                    className={'previousAction btn-prev ' + (questionIndex === 0 ? 'hidden' : '')}
                                    buttonText='Previous'
                                    icon='fa-chevron-left' />
                                <Button onNextButtonClicked={this.onNextButtonClicked}
                                    questionIndex={questionIndex}
                                    className={'nextAction btn-next ' + (questionIndex === this.props.lastQuestionIndex ? 'hidden' : '')}
                                    buttonText='Next'
                                    icon='fa-chevron-right' />
                                <Button
                                    onSubmitButtonClicked={this.onSubmit}
                                    questionIndex={questionIndex}
                                    className={'submitAction btn-next ' + (!(questionIndex === this.props.lastQuestionIndex) ? 'hidden' : '')}
                                    buttonText='Submit'
                                    icon='fa-share-square' 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Question;

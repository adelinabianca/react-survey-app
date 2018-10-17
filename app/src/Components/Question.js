import React, { Component } from 'react'
import {Button} from './Button';
import { CheckboxList } from './CheckboxList';
import { RadioButtonList } from './RadioButtonList';
import { Textarea } from './Textarea';

export class Question extends Component {
    showAnswers(answerType, answers) {
        if (answerType === 'single') {
            return <RadioButtonList answers={answers} />
        }
        if (answerType === 'multiple') {
            return <CheckboxList answers={answers} />
        }
        return <Textarea />;
        
    }
  render() {
    const questionCard = this.props.questionCard;
    const answers = questionCard.answers;
    const answerType = questionCard.answerType;
    const questionIndex = this.props.questionIndex;
    
    return (
      <div className="questionSection ">
        <div className="media-container-row">
          <div className="title col-12 col-md-10">
            <div className="question">
                <h2 className="pb-3 pt-3 mbr-fonts-style display-2">
                    {questionCard.question}
                </h2>
                <h3 className="mbr-section-subtitle align-center mbr-light mbr-fonts-style display-7 pb-2 pt-2 pl-2 pr-2 mb-4">
                    {questionCard.subtitle}
                </h3>
                {this.showAnswers(answerType, answers)}
                <div className="media-container-row buttonPadding">
                    <Button onPreviousButtonClicked={this.props.onPreviousButtonClicked} 
                            questionIndex={questionIndex} 
                            className={'previousAction btn-prev ' + (questionIndex === 0 ? 'hidden' : '') }
                            buttonText='Previous' 
                            icon='fa-chevron-left'/>
                    <Button onNextButtonClicked={this.props.onNextButtonClicked}
                            questionIndex={questionIndex} 
                            className={'nextAction btn-next ' + (questionIndex === this.props.lastQuestionIndex ? 'hidden': '')} 
                            buttonText='Next' 
                            icon='fa-chevron-right'/>
                    <Button 
                            questionIndex={questionIndex}
                            className={'submitAction btn-next ' + (!(questionIndex === this.props.lastQuestionIndex) ? 'hidden': '')}
                            buttonText='Submit' 
                            icon='fa-share-square'/>
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Question;

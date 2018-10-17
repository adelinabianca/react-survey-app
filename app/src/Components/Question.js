import React, { Component } from 'react'
import {Button} from './Button';
import { Answer } from './Answer';

export class Question extends Component {
    
  render() {
    const questionCard = this.props.questionCard;
    const answers = questionCard.answers;
    const answerType = questionCard.answerType;    

    return (
      <div className="questionSection">
        <div className="media-container-row">
          <div className="title col-12 col-md-10">
            <div className="question">
                <h2 className="pb-3 pt-3 mbr-fonts-style display-2">
                    {questionCard.question}
                </h2>
                <h3 className="mbr-section-subtitle align-center mbr-light mbr-fonts-style display-7 pb-2 pt-2 pl-2 pr-2 mb-4">
                    {questionCard.subtitle}
                </h3>
                <Answer answers={answers} answerType={answerType}/>
                <div className="media-container-row buttonPadding">
                    <Button className='previousAction btn-prev' buttonText='Previous' icon='fa-chevron-left'/>
                    <Button className='nextAction btn-next' buttonText='Next' icon='fa-chevron-right'/>
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Question;

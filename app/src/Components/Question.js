import React, { Component } from 'react'
import {Button} from './Button'
import {RadioButton} from './RadioButton';
import {Checkbox} from './Checkbox'
import { Textarea } from './Textarea';

export class Question extends Component {
    
  render() {
    const questionCard = this.props.questionCard;
    const answers = questionCard.answers;
    const answerType = questionCard.answerType;

    function RadioAnswer(props) {
        return (
            <div className="col-12 cold-md-8 question-options">
                <div className="align-left">
                    <RadioButton answer={answers[0]}/>
                    <RadioButton answer={answers[1]}/>
                    <RadioButton answer={answers[2]}/>
                    <RadioButton answer={answers[3]}/>
                </div>
             </div>
        );
    }
    function CheckBoxAnswer(props) {
        return (
            <div className="col-12 cold-md-8 question-options">
                <div className="align-left">
                    <Checkbox answer={answers[0]}/>
                    <Checkbox answer={answers[1]}/>
                    <Checkbox answer={answers[2]}/>
                    <Checkbox answer={answers[3]}/>
                </div>
             </div>
        );
    }
    function InputAnswer(props) {
        return <Textarea />
    }

    function Answers(props) {
        const answerType = props.answerType;
        if (answerType === 'radioButton') {
            return <RadioAnswer />
        }
        if (answerType === 'checkbox') {
            return <CheckBoxAnswer />
        }
        return <InputAnswer />;
        
    }

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
                <Answers answerType={answerType}/>
                <div className="media-container-row buttonPadding">
                <Button />
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Question;

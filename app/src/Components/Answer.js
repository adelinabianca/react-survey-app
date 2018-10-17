import React, { Component } from 'react';
import {RadioButton} from './RadioButton';
import {Checkbox} from './Checkbox';
import { Textarea } from './Textarea';

export class Answer extends Component {
  render() {
    const answerType = this.props.answerType;
    const answers = this.props.answers;
    // const Tag = answerType === 'multiple' ? 'Checkbox' : 'Radiobutton';

    // displayListOfAnswers = () => {
    //     let listOfAnswers = [];
    //     for(let i=0; i< answers.length; i++) {
    //         listOfAnswers.push(<Tag answer={answers[i]}/>)
    //     }
    //     return listOfAnswers;
    // }

    function RadioAnswer() {
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
    function CheckBoxAnswer() {
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
    function InputAnswer() {
        return <Textarea />
    }

    function ShowAnswers() {
        if (answerType === 'single') {
            return <RadioAnswer />
        }
        if (answerType === 'multiple') {
            return <CheckBoxAnswer />
        }
        return <InputAnswer />;
        
    }
    return (
      <ShowAnswers answerType={answerType}/>
    )
  }
}

export default Answer;

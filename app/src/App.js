import React, { Component } from 'react';
import './App.css';
import Question from './Components/Question';

import questionnaireConfig from './questionnaireConfig.json';

class App extends Component {
    constructor(props) {
        super(props);

        const config = questionnaireConfig;
        this.state = {
            questionIndex: 0,
            answers: [],
            questionnaireConfig: config,
            previousAnswer: [] // {questionId: '', answers: []}
        };
    }

    saveQuestionAnswer = (answer) => {
        this.setState( (prevState) => ({answers: [...prevState.answers, answer]}));
    }

    goToNextQuestion = () => {
        const { questionIndex } = this.state;

        this.setState ({questionIndex: questionIndex + 1});
    }

    goToPreviousQuestion= () => {
        const { questionIndex } = this.state;

        this.setState( (prevState) => ({questionIndex: questionIndex - 1,
                                        answers: prevState.answers.filter(prevAnswer => prevAnswer.questionId !== this.state.questionIndex),
                                        previousAnswer: prevState.answers.filter(prevAnswer => prevAnswer.questionId === this.state.questionIndex)}));
    }

    checkIfQuestionHasAnswer = () => {
        const { answers } = this.state;
        const { questionnaireConfig: { questions } } = this.state;
        const previousAnswer = answers.find(a => a.questionId === questions[this.state.questionIndex].id); 

        this.setState(() => ({
            previousAnswer : previousAnswer
        }));
    }

  render() {
      const { questionnaireConfig: { questions } } = this.state;
    return (
      <div>
      <section className="header1 cover-photo" id="header1-3">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="mbr-white">
                        <h1 className="mbr-section-title align-center mbr-bold pb-3 pt-3 mbr-fonts-style display-1">
                            TECH SURVEY 2018</h1>
                        <p className="mbr-text align-center pb-3 mbr-fonts-style display-5">
                            THE STATE OF THE LEVININE DEVELOPER ECOSYSTEM IN 2018
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </section>
      <section  className="mbr-section content4 cid-r5TcdM8O84" id="content4-6">
        <div className="align-center container">
          <form>
            <Question 
                questionIndex={this.state.questionIndex}
                lastQuestionIndex={questions.length - 1}
                question={questions[this.state.questionIndex]}
                goToNextQuestion={this.goToNextQuestion}
                goToPreviousQuestion={this.goToPreviousQuestion} 
                saveQuestionAnswer={this.saveQuestionAnswer}
                checkIfQuestionHasAnswer={this.checkIfQuestionHasAnswer}
                previousAnswer={this.state.previousAnswer} />
          </form>
        </div>
      </section>
      </div>
    );
  }
}

export default App;

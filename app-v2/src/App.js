import React, { Component } from 'react';
import axios from 'axios'

import './App.css';
import { Question } from './Components/Question';

import questionnaireConfig from './questionnaireConfig.json';

class App extends Component {
    constructor(props) {
        super(props);

        const config = questionnaireConfig;
        this.state = {
            questionIndex: 0,
            answers: [],
            questionnaireConfig: config,
            previousAnswer: ''
        };
    }
    componentWillMount() {
      const url = window.location.href;
      const startChar = url.indexOf('/', 8);
      const userId = url.substr(startChar + 1, url.length);
      // axios.get(URLforGETQuestions).then(response => {
      //   this.setState({questionnaireConfig: response.data})
      // });
      // axios.get(URLforPOSTAnswers, userId).then( response => {
      //   this.setState({answers: response.data.answers})
      // });
    }

    componentDidMount() {
        this.hydrateStateWithLocalStorage();
    
        window.addEventListener(
          "beforeunload",
          this.saveStateToLocalStorage.bind(this)
        );
      }
    
      componentWillUnmount() {
        window.removeEventListener(
          "beforeunload",
          this.saveStateToLocalStorage.bind(this)
        );
    
        this.saveStateToLocalStorage();
      }

    hydrateStateWithLocalStorage() {
        for (let key in this.state) {
          if (localStorage.hasOwnProperty(key)) {
            let value = localStorage.getItem(key);
    
            try {
              value = JSON.parse(value);
              this.setState({ [key]: value });
            } catch (e) {
              this.setState({ [key]: value });
            }
          }
        }
      }

      saveStateToLocalStorage() {
        for (let key in this.state) {
          localStorage.setItem(key, JSON.stringify(this.state[key]));
        }
      }

    saveQuestionAnswer = (answer) => {
        const index = this.state.answers.map(ans => ans.questionId).indexOf(answer.questionId);
        if(index === -1) {
        this.setState( prevState => ({answers: [...prevState.answers, answer]}));
        } else {
            let updatedAnswers =  this.state.answers.slice();
            updatedAnswers = updatedAnswers.filter(prevAnswer => prevAnswer.questionId !== answer.questionId);
            updatedAnswers = updatedAnswers.concat(answer);
            this.setState({answers: updatedAnswers})
        }
    }

    goToNextQuestion = () => {
        const { questionIndex } = this.state;

        this.setState ({questionIndex: questionIndex + 1});
    }
    goToPreviousQuestion = () => {
        const { questionIndex } = this.state;

        this.setState ({questionIndex: questionIndex - 1});
    }
    checkIfPreviousQuestionHasAnswer = () => {
        const { answers } = this.state;
        const { questionnaireConfig: { questions } } = this.state;
        const previousAnswer = answers.find(a => a.questionId === questions[this.state.questionIndex-1].id); 

        this.setState(() => ({
            previousAnswer : previousAnswer
        }));
    }
    checkIfNextQuestionHasAnswer = () => {
        const { answers } = this.state;
        const { questionnaireConfig: { questions } } = this.state;
        const previousAnswer = answers.find(a => a.questionId === questions[this.state.questionIndex+1].id);
        this.setState(() => ({
            previousAnswer : previousAnswer || ''
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
            <div className="questionSection ">
              <div className="media-container-row">
                  <div className="title col-12 col-md-10">
                   <Question 
                          questionIndex={this.state.questionIndex}
                          question={questions[this.state.questionIndex]}
                          previousAnswer={this.state.previousAnswer}
                          lastQuestionIndex={questions.length - 1}
                          saveQuestionAnswer={this.saveQuestionAnswer}
                          goToNextQuestion={this.goToNextQuestion}
                          goToPreviousQuestion={this.goToPreviousQuestion}
                          checkIfPreviousQuestionHasAnswer={this.checkIfPreviousQuestionHasAnswer}
                          checkIfNextQuestionHasAnswer={this.checkIfNextQuestionHasAnswer}
                          answers={this.state.answers}
                    />
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
      </div>
    );
  }
}

export default App;

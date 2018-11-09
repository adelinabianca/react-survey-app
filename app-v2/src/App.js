import React, { Component } from "react";
import axios from "axios";

import "./App.css";
import { Question } from "./Components/Question";

import Spinner from "./Components/Spinner";
import PageNotFound from "./Components/PageNotFound";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionIndex: 0,
      answers: [],
      questionnaireConfig: "",
      previousAnswer: { questionId: "", answers: [] },
      loading: true,
      error: false
    };
  }

  // // Save state to local storage
  componentDidMount() {
    const url = window.location.href;
    const startChar = url.indexOf("/", 8);
    const jobCode = url.substr(startChar + 1, url.length);

    axios
      .get("http://localhost:64282/api/survey?uid=" + jobCode)
      .then(response => {
        const questionnaireConfig = response.data;
        const index = questionnaireConfig.questions.indexOf(
          questionnaireConfig.questions.find(question => question.selectedAnswers.length === 0)
        );
        if (index === -1) {
          this.setState(
            {
              questionnaireConfig: questionnaireConfig,
              questionIndex: questionnaireConfig.questions.length,
              loading: false,
              error: false
            },
            () => {
              this.hydrateStateWithLocalStorage();

              window.addEventListener("beforeunload", this.saveStateToLocalStorage.bind(this));
            }
          );
        } else {
          this.setState(
            {
              questionnaireConfig: questionnaireConfig,
              answers: questionnaireConfig.questions.map(question => {
                return { questionId: question.id, answers: question.selectedAnswers };
              }),
              questionIndex: questionnaireConfig.questions.indexOf(
                questionnaireConfig.questions.find(
                  question => question.selectedAnswers.length === 0
                )
              ),
              loading: false,
              error: false
            },
            () => {
              this.hydrateStateWithLocalStorage();

              window.addEventListener("beforeunload", this.saveStateToLocalStorage.bind(this));
            }
          );
        }
      })
      .catch(err => this.setState({ error: true }));
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.saveStateToLocalStorage.bind(this));

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
  //   // ------

  saveQuestionAnswer = answer => {
    const {
      questionnaireConfig: { questions }
    } = this.state;
    const indexOfQuestion = questions.map(question => question.id).indexOf(answer.questionId);
    let questionnaire = Object.assign({}, this.state.questionnaireConfig);
    let updatedAnswers = this.state.answers.slice();
    if (answer.answers.length !== 0) {
      questionnaire.questions[indexOfQuestion].selectedAnswers = answer.answers;
      updatedAnswers = updatedAnswers.filter(
        prevAnswer => prevAnswer.questionId !== answer.questionId
      );
      updatedAnswers = updatedAnswers.concat(answer);
    }
    this.setState({ answers: updatedAnswers, questionnaireConfig: questionnaire });
  };

  goToNextQuestion = () => {
    const { questionIndex } = this.state;

    this.setState({ questionIndex: questionIndex + 1 });
  };
  goToPreviousQuestion = () => {
    const { questionIndex } = this.state;

    this.setState({ questionIndex: questionIndex - 1 });
  };
  checkIfPreviousQuestionHasAnswer = () => {
    const { answers } = this.state;
    const {
      questionnaireConfig: { questions }
    } = this.state;
    const previousAnswer = answers.find(
      a => a.questionId === questions[this.state.questionIndex - 1].id
    );

    this.setState(() => ({
      previousAnswer: previousAnswer
    }));
  };
  checkIfNextQuestionHasAnswer = () => {
    const { answers } = this.state;
    const {
      questionnaireConfig: { questions }
    } = this.state;
    const previousAnswer = answers.find(
      a => a.questionId === questions[this.state.questionIndex + 1].id
    );
    this.setState(() => ({
      previousAnswer: previousAnswer
    }));
  };

  onSubmitQuestionnaire = answer => {
    const {
      questionnaireConfig: { questions }
    } = this.state;
    const indexOfQuestion = questions.map(question => question.id).indexOf(answer.questionId);
    let questionnaire = Object.assign({}, this.state.questionnaireConfig);
    let updatedAnswers = this.state.answers.slice();
    if (answer.answers.length !== 0) {
      questionnaire.questions[indexOfQuestion].selectedAnswers = answer.answers;
      updatedAnswers = updatedAnswers.filter(
        prevAnswer => prevAnswer.questionId !== answer.questionId
      );
      updatedAnswers = updatedAnswers.concat(answer);
    }

    this.setState({ answers: updatedAnswers, questionnaireConfig: questionnaire });

    const url = window.location.href;
    const startChar = url.indexOf("/", 8);
    const jobCode = url.substr(startChar + 1, url.length);
    questionnaire.userId = jobCode;
    axios.post("http://localhost:64282/api/Submit", questionnaire).then(response => {});
  };
  render() {
    let page = <PageNotFound />;
    if (!this.state.error) {
      let questionCard = <Spinner />;
      if (!this.state.loading) {
        questionCard = (
          <div className="title col-12 col-md-10">
            <Question
              questionIndex={this.state.questionIndex}
              question={
                this.state.questionIndex <= this.state.questionnaireConfig.questions.length - 1
                  ? this.state.questionnaireConfig.questions[this.state.questionIndex]
                  : null
              }
              previousAnswer={this.state.previousAnswer}
              lastQuestionIndex={this.state.questionnaireConfig.questions.length - 1}
              saveQuestionAnswer={this.saveQuestionAnswer}
              onSubmitQuestionnaire={this.onSubmitQuestionnaire}
              goToNextQuestion={this.goToNextQuestion}
              goToPreviousQuestion={this.goToPreviousQuestion}
              checkIfPreviousQuestionHasAnswer={this.checkIfPreviousQuestionHasAnswer}
              checkIfNextQuestionHasAnswer={this.checkIfNextQuestionHasAnswer}
              answers={this.state.answers}
            />
          </div>
        );
      }
      page = (
        <div>
          <section className="header1 cover-photo" id="header1-3">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="mbr-white">
                    <h1 className="mbr-section-title align-center mbr-bold pb-3 pt-3 mbr-fonts-style display-1">
                      TECH SURVEY 2018
                    </h1>
                    <p className="mbr-text align-center pb-3 mbr-fonts-style display-5">
                      THE STATE OF THE LEVININE DEVELOPER ECOSYSTEM IN 2018
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="mbr-section content4 cid-r5TcdM8O84" id="content4-6">
            <div className="align-center container">
              <form>
                <div className="questionSection ">
                  <div className="media-container-row">{questionCard}</div>
                </div>
              </form>
            </div>
          </section>
        </div>
      );
    }
    return page;
  }
}

export default App;

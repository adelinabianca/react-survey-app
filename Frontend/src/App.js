import React, { Component } from "react";
import { GET_SURVEY_URL, SUBMIT_SURVEY_URL, DEMO_URL, GET_STATISTICS_URL } from './config/config';
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
      error: false,
      uid: ''
    };
  }

  componentDidMount() {
    const querystring = window.location.search.substring(1);
    let uid;

    if (querystring.includes('uid')) {
      uid = querystring.substring(4);
      this.fetchRequest(uid);
    } else {
      const surveyCode =  querystring.substring(9);
      if (localStorage.getItem(surveyCode) !== null) {
        uid = localStorage.getItem(surveyCode);
        this.fetchRequest(uid)
      } else {
        const url = `${DEMO_URL}${surveyCode}`;
        fetch(url)
          .then(data => data.json())
          .then(data => {
            uid = data.uid;
            localStorage.setItem(surveyCode, uid);
            this.fetchRequest(uid);
          })
          .catch(err => this.setState({error: true}))
      }
    }
  }

  fetchRequest = (uid) => {
    const url = `${GET_SURVEY_URL}${uid}`;
            fetch(url)
              .then(data => data.json())
              .then(data => {
                const questionnaireConfig = data;
                const index = questionnaireConfig.questions.indexOf(
                  questionnaireConfig.questions.find(question => question.selectedAnswers.length === 0)
                );
                if (index === -1) {
                  this.setState({
                    questionnaireConfig: questionnaireConfig,
                    questionIndex: questionnaireConfig.questions.length,
                    loading: false,
                    error: false,
                    uid: uid
                  });
                } else {
                  this.setState({
                    questionnaireConfig: questionnaireConfig,
                    answers: questionnaireConfig.questions.map(question => {
                      return { questionId: question.id, answers: question.selectedAnswers };
                    }),
                    questionIndex: questionnaireConfig.questions.indexOf(
                      questionnaireConfig.questions.find(question => question.selectedAnswers.length === 0)
                    ),
                    loading: false,
                    error: false,
                    uid: uid
                  });
                }
              })
              .catch(err => this.setState({ error: true }));
  }

  saveQuestionAnswer = answer => {
    const {
      answers,
      questionnaireConfig,
      questionnaireConfig: { questions }
    } = this.state;

    const indexOfQuestion = questions.map(question => question.id).indexOf(answer.questionId);
    let questionnaire = Object.assign({}, questionnaireConfig);
    let updatedAnswers = answers.slice();

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
      questionIndex,
      questionnaireConfig: { questions }
    } = this.state;

    const previousAnswer = answers.find(a => a.questionId === questions[questionIndex - 1].id);

    this.setState(() => ({
      previousAnswer: previousAnswer
    }));
  };

  checkIfNextQuestionHasAnswer = () => {
    const {
      answers,
      questionIndex,
      questionnaireConfig: { questions }
    } = this.state;

    const previousAnswer = answers.find(a => a.questionId === questions[questionIndex + 1].id);
    this.setState(() => ({
      previousAnswer: previousAnswer
    }));
  };

  onSubmitQuestionnaire = answer => {
    const {
      answers,
      questionnaireConfig,
      questionnaireConfig: { questions }
    } = this.state;

    const indexOfQuestion = questions.map(question => question.id).indexOf(answer.questionId);
    let questionnaire = Object.assign({}, questionnaireConfig);
    let updatedAnswers = answers.slice();

    if (answer.answers.length !== 0) {
      questionnaire.questions[indexOfQuestion].selectedAnswers = answer.answers;
      updatedAnswers = updatedAnswers.filter(
        prevAnswer => prevAnswer.questionId !== answer.questionId
      );
      updatedAnswers = updatedAnswers.concat(answer);
    }

    this.setState({ answers: updatedAnswers, questionnaireConfig: questionnaire });

    questionnaire['UserId'] = this.state.uid;
    const url = `${SUBMIT_SURVEY_URL}`;

    fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(questionnaire)
    }).then(response => {});
  };

  onFinishSurvey = (answer) => {
    const {
      answers,
      questionnaireConfig,
      questionnaireConfig: { questions }
    } = this.state;

    const indexOfQuestion = questions.map(question => question.id).indexOf(answer.questionId);
    let questionnaire = Object.assign({}, questionnaireConfig);
    let updatedAnswers = answers.slice();

    if (answer.answers.length !== 0) {
      questionnaire.questions[indexOfQuestion].selectedAnswers = answer.answers;
      updatedAnswers = updatedAnswers.filter(
        prevAnswer => prevAnswer.questionId !== answer.questionId
      );
      updatedAnswers = updatedAnswers.concat(answer);
    }

    this.setState({ answers: updatedAnswers, questionnaireConfig: questionnaire });

    questionnaire['UserId'] = this.state.uid;
    const url = `${SUBMIT_SURVEY_URL}`;

    
    fetch(url, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(questionnaire)
      })
    .then(() => {});
  }

  render() {
    const { loading, questionIndex, questionnaireConfig, previousAnswer, answers } = this.state;

    let page;

    if (!this.state.error) {
      let questionCard = loading ? (
        <Spinner />
      ) : (
        <div className="title col-12 col-md-10">
          <Question
            question={
              questionIndex <= questionnaireConfig.questions.length - 1
                ? questionnaireConfig.questions[questionIndex]
                : null
            }
            lastQuestionIndex={questionnaireConfig.questions.length - 1}
            saveQuestionAnswer={this.saveQuestionAnswer}
            onSubmitQuestionnaire={this.onSubmitQuestionnaire}
            onFinishSurvey={this.onFinishSurvey}
            goToNextQuestion={this.goToNextQuestion}
            goToPreviousQuestion={this.goToPreviousQuestion}
            checkIfPreviousQuestionHasAnswer={this.checkIfPreviousQuestionHasAnswer}
            checkIfNextQuestionHasAnswer={this.checkIfNextQuestionHasAnswer}
            {...{ answers, previousAnswer, questionIndex }}
          />
        </div>
      );

      page = (
        <div>
          <section className="header1 cover-photo" id="header1-3">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <div className="mbr-white">
                    <h1 className="mbr-section-title align-center mbr-bold pb-3 pt-3 mbr-fonts-style display-1">
                      THE STATE OF LEVININE DEVELOPER ECOSYSTEM
                    </h1>
                    // <p className="mbr-text align-center pb-3 mbr-fonts-style display-5">
					 // THE STATE OF LEVININE DEVELOPER ECOSYSTEM IN 2018
                    // </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="mbr-section content4 cid-r5TcdM8O84" id="content4-6">
            <div className="align-center container-fluid">
              <form>
                <div className="questionSection ">
                  <div className="media-container-row">{questionCard}</div>
                </div>
              </form>
            </div>
          </section>
        </div>
      );
    } else {
      page = <PageNotFound />;
    }

    return page;
  }
}  

export default App;

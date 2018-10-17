import React, { Component } from 'react';
import './App.css';
import Question from './Components/Question'

class App extends Component {
  render() {
      const questions = [{question: 'I\'m a ___ developer', subtitle:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', answers: ['QA', 'Scala', '.Net', 'Frontend'], answerType: 'single'},
                         {question: 'I\'m currently using ___ technologies', subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', answers: ['Scala 2.12.4', 'AngularJs', '.Net Core', 'Java 11'], answerType: 'multiple'}, 
                         {question: 'I have this ___  to say', subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', answers: '', answerType: 'input'}];
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
      {/* <section className="engine"><a>LeviNine Tech Survey 2018</a></section> */}
      <section  className="mbr-section content4 cid-r5TcdM8O84" id="content4-6">
        <div className="align-center container">
          <form>
            <Question questionCard={questions[1]} />
          </form>
        </div>
      </section>
      </div>
    );
  }
}

export default App;

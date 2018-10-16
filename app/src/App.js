import React, { Component } from 'react';
import './App.css';
import Question from './Components/Question'

class App extends Component {
  render() {
      const questions = [{question: 'I\'m a ___ developer', subtitle:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', answers: ['QA', 'Scala', '.Net', 'Frontend'], answerType: 'radioButton'},
                         {question: 'I\'m currently using ___ technologies', subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', answers: ['Scala 2.12.4', 'AngularJs', '.Net Core', 'Java 11'], answerType: 'checkbox'}, 
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
      <section className="engine"><a>LeviNine Tech Survey 2018</a></section>
      <section  className="mbr-section content4 cid-r5TcdM8O84" id="content4-6">
        <div className="align-center container">
          <form>
            <Question questionCard={questions[0]} />
            {/* <div className="questionSection hidden">
                <div className="media-container-row">
                    <div className="title col-12 col-md-10">
                        <div className="question">
                            <h2 className="pb-3 pt-3 mbr-fonts-style display-2">
                                I'm currently using ___ technologies</h2>
                            <h3 className="mbr-section-subtitle align-center mbr-light mbr-fonts-style display-7 pb-2 pt-2 pl-2 pr-2 mb-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                            </h3>
                            <div className="col-12 cold-md-8 question-options">
                                <div className="align-left">
                                    <label className="checkboxContainer">Scala 2.12.4
                                        <input type="checkbox"/>
                                        <span className="checkmark"></span>
                                    </label>
                                    
                                    <label className="checkboxContainer">AngularJS
                                        <input type="checkbox"/>
                                        <span className="checkmark"></span>
                                    </label>
                                    
                                    <label className="checkboxContainer">.NET Core
                                        <input type="checkbox"/>
                                        <span className="checkmark"></span>
                                    </label>
                                    
                                    <label className="checkboxContainer">Java 11
                                        <input type="checkbox"/>
                                        <span className="checkmark"></span>
                                    </label>
                                </div>				
                            </div>
                            <div className="media-container-row buttonPadding">
                                <button type="button" className="btn previousAction btn-prev"><i className="fa fa-chevron-left"></i>Previous</button>
                                <button type="button" className="btn nextAction btn-next" disabled><i className="fa fa-chevron-right"></i>Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            {/* <div className="questionSection hidden">
                <div className="media-container-row">
                    <div className="title col-12 col-md-10">
                        <div className="question">
                            <h2 className="pb-3 pt-3 mbr-fonts-style display-2">
                                I have this ___  to say</h2>
                            <h3 className="mbr-section-subtitle align-center mbr-light mbr-fonts-style display-7 pb-2 pt-2 pl-2 pr-2 mb-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                            </h3>
                            <div className="question-options">
                                <div className="input-group">
                                    <textarea className="form-textarea" aria-label="With textarea"></textarea>
                                </div>    
                            </div>
                            <div className="media-container-row buttonPadding">
                                <button type="button" className="btn previousAction btn-prev"><i className="fa fa-chevron-left"></i>Previous</button>
                                <button type="button" className="btn submitAction btn-next" disabled><i className="fa fa-share-square"></i>Submit</button>
                            </div>
                     </div>
                    </div>
                </div>	
            </div> */}
          </form>
        </div>
      </section>
      </div>
    );
  }
}

export default App;

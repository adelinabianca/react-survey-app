import React, { Component } from 'react';
import Checkbox from './Checkbox';

export class CheckboxList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedAnswers: [],
      inputAnswer: '',
    };
  }
  // functions should be separated by one empty line
  componentWillMount() {
    if (this.props.previousAnswer.answers.length !== 0) {
      this.setState({
        checkedAnswers: this.props.previousAnswer.answers,
        inputAnswer: this.props.previousAnswer.answers
          .filter(prevAnswer => prevAnswer.includes('Other:'))
          .map(e => e.substring(7))[0],
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.previousAnswer !== nextProps.previousAnswer ||
      this.props.answerOptions !== nextProps.answerOptions
    ) {
      this.setState({
        checkedAnswers:
          nextProps.previousAnswer.answers.length !== 0
            ? nextProps.previousAnswer.answers
            : [],
        inputAnswer:
          nextProps.previousAnswer.answers.length !== 0
            ? nextProps.previousAnswer.answers
                .filter(prevAnswer => prevAnswer.includes('Other:'))
                .map(e => e.substring(7))[0]
            : [],
      });
    }
  }

  handleChange = event => {
    const answer = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      this.setState(
        prevState => ({
          checkedAnswers: [...prevState.checkedAnswers, answer],
        }),
        () => this.props.saveAnswers(this.state.checkedAnswers),
      );
    } else {
      if (answer === 'Other') {
      } // unuseful if 
      this.setState(
        prevState => ({
          checkedAnswers: prevState.checkedAnswers.filter(
            prevAnswer =>
              prevAnswer !== answer &&
              (answer === 'Other' ? !prevAnswer.includes('Other:') : true),
          ),
        }),
        () => this.props.saveAnswers(this.state.checkedAnswers),
      );
    }
  };

  handleInputOptionChange = event => {
    let updatedCheckedAnswers = this.state.checkedAnswers;
    let indexOfOtherOption = updatedCheckedAnswers.indexOf(
      updatedCheckedAnswers.filter(answer => answer.includes('Other:'))[0],
    );
    // separe logical blocks by one empty line 
    indexOfOtherOption !== -1 // use this way only for variable assignments, replace with if
      ? (updatedCheckedAnswers[indexOfOtherOption] =
          'Other: ' + event.target.value)
      : (updatedCheckedAnswers = updatedCheckedAnswers.concat(
          'Other: ' + event.target.value,
        ));
    
    this.setState(
      {
        checkedAnswers: updatedCheckedAnswers,
        inputAnswer: event.target.value,
      },
      () => this.props.saveAnswers(this.state.checkedAnswers),
    );
  };

  render() {
    const { answerOptions } = this.props;
    return (
      <div className="col-12 cold-md-8 question-options">
        <div className="align-left">
          {answerOptions.map((answer, index) => (
            <Checkbox
              key={answer + index + 'checkbox'}
              answer={answer}
              checked={this.state.checkedAnswers.indexOf(answer) > -1}
              onChange={this.handleChange}
              value={this.state.inputAnswer}
              onInputOptionChange={this.handleInputOptionChange}
              answerType={this.props.answerType}
              index={index}
              answerOptions={answerOptions}
            /> // use spread operator for passing props 
            /*
              <Checkbox {...{ answer, index, answerOptions, samd }} />
            */
          ))}
        </div>
      </div>
    );
  }
}

export default CheckboxList;

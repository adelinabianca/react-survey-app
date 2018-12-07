import React, { Component } from "react";

export class Textarea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputAnswer: [{option: '', goTo: ''}]
    };
  }

  componentWillMount() {
    if (this.props.previousAnswer.answers[0].option.length !== 0) {
      this.setState({ inputAnswer: this.props.previousAnswer.answers });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.questionIndex !== nextProps.questionIndex) {
      this.setState({
        inputAnswer:
          nextProps.previousAnswer.answers[0].option.length !== 0 ? nextProps.previousAnswer.answers : [{option: '', goTo: ''}]
      });
    }
  }

  handleChange = event => {
    this.setState({ inputAnswer: [{option: event.target.value, goTo: ''}] }, () => {
      this.props.saveAnswers(this.state.inputAnswer);
    });
  };

  render() {
    return (
      <div className="question-options">
        <div className="input-group">
          <textarea
            className="form-textarea"
            value={this.state.inputAnswer[0].option}
            onChange={this.handleChange}
            placeholder="Write your response here..."
            aria-label="With textarea"
          />
        </div>
      </div>
    );
  }
}

export default Textarea;

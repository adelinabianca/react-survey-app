import React, { Component } from 'react'

export class Textarea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputAnswer: ''
        }
    }
    componentWillMount() {
        if(this.props.previousAnswer !== ''){
            this.setState({inputAnswer: this.props.previousAnswer.answers})
        }
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.questionIndex !== nextProps.questionIndex) {
            this.setState({inputAnswer: nextProps.previousAnswer !== '' ? nextProps.previousAnswer.answers : ''})
        }
    }
    handleChange = (event) => {
        this.setState({inputAnswer: event.target.value}, () => {this.props.saveAnswers(this.state.inputAnswer)})
    }
  render() {
    return (
        <div className="question-options">
            <div className="input-group">
                <textarea className="form-textarea" 
                          value={this.state.inputAnswer}
                          onChange={this.handleChange} 
                          placeholder='Write your response here...'
                          aria-label="With textarea">
                </textarea>
            </div>    
        </div>
    )
  }
}

export default Textarea;

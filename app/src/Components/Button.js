import React, { Component } from 'react'

export class Button extends Component {
  render() {
    const buttonText = this.props.buttonText;
    const buttonClassName = this.props.className;
    const iconClassName = this.props.icon;
    

    return (
      <button type="button" 
              onClick={() => {buttonText === 'Next' ? 
                              this.props.onNextButtonClicked(this.props.questionIndex) :
                              this.props.onPreviousButtonClicked(this.props.questionIndex)}} 
              className={`btn ${buttonClassName}`}>
              <i className={`fa ${iconClassName}`}></i>
              {buttonText}
      </button>
    )
  }
}

export default Button;

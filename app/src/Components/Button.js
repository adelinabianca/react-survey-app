import React, { Component } from 'react'

export class Button extends Component {
  render() {
    const buttonText = this.props.buttonText;
    const buttonClassName = this.props.className;
    const iconClassName = this.props.icon;
    

    return (
      <button type="button" 
              disabled={this.props.disabled}
              onClick={() => {buttonText === 'Next' ? 
                              this.props.onNextButtonClicked() :
                              buttonText === 'Previous' ? this.props.onPreviousButtonClicked() : this.props.onSubmitButtonClicked()}} 
              className={`btn ${buttonClassName}`}>
              <i className={`fa ${iconClassName}`}></i>
              {buttonText}
      </button>
    )
  }
}

export default Button;

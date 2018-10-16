import React, { Component } from 'react'

export class Button extends Component {
  render() {
    return (
        <button type="button" className="btn nextAction btn-next"><i className="fa fa-chevron-right"></i>Next</button>
    )
  }
}

export default Button;

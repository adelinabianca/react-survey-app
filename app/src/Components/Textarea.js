import React, { Component } from 'react'

export class Textarea extends Component {
  render() {
    return (
        <div className="question-options">
            <div className="input-group">
                <textarea className="form-textarea" aria-label="With textarea"></textarea>
            </div>    
        </div>
    )
  }
}

export default Textarea;

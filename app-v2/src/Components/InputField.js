import React from 'react'

const InputField = (props) => {
  return (
    <input
          type="text"
          key="inputCheckbox"
          name="inputOption"
          value={props.value}
          disabled={!props.checked}
          checked={true}
          onChange={event => props.onInputOptionChange(event)}
          onBlur={event => (!props.checked ?  event.target.value = '' : null)}
        />
  )
}

export default InputField;

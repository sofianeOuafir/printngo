import React, { Fragment } from 'react';

const TextInput = ({errors, ...props}) => {
  return (
    <Fragment>
      <input {...props} />
      { errors && <ul className="errors">  
        { errors.map((error, index) => (
          <li key={index}>{error}</li>
        )) }
      </ul> }
    </Fragment>
  )
}

export default TextInput;
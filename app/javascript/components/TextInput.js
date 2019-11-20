import React, { Fragment } from "react";

const TextInput = ({ errors, ...props }) => {
  return (
    <div className="flex flex-direction--column">
      <input {...props} />
      {errors && (
        <ul className="errors mb1">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TextInput;

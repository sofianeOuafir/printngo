import React from "react";

const TextInput = ({ errors, label = null, ...props }) => {
  return (
    <div className="flex flex-direction--column">
      {label && <label className="mb05 text-navy">{label}</label>}
      <input {...props} />
      {errors && errors.length > 0 && (
        <ul
          className="errors"
          style={{ marginTop: "5px", marginBottom: "5px" }}
        >
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TextInput;

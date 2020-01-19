import React from "react";

const TextInput = ({
  errors,
  label = null,
  labelDirection = "column",
  labelClassName = "text-navy",
  ...props
}) => {
  return (
    <div
      className={`flex ${
        labelDirection == "column"
          ? "flex-direction--column"
          : "flex-direction--row align-items--center"
      }`}
    >
      {label && (
        <label
          style={{ marginBottom: "5px", marginRight: "5px" }}
          className={labelClassName}
        >
          {label}
        </label>
      )}
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

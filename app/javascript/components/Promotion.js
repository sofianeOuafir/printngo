import React from "react";

const Promotion = ({ text = null, link = null, className, ...props }) => {
  return (
    text && (
      <a
        target="_blank"
        className={`${!link &&
          "text-decoration--none "} word-wrap--break-word ${className}`}
        href={link}
      >
        {text}
      </a>
    )
  );
};

export default Promotion;

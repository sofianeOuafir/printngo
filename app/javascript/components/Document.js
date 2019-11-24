import React from "react";
import pluralize from "pluralize";

import images from "../images";

const Document = ({ name, numberOfPage, onViewClick = null }) => (
  <div className="document flex center">
    <a onClick={onViewClick} className="pointer">
      <img src={images.pdf} alt="Document Icon" width={40} />
    </a>

    <a onClick={onViewClick} className="pointer document--info flex flex-direction--column">
      <span title={name}>
        {name.length > 30 ? `${name.substring(0, 30)}...` : name}
      </span>
      <span>{` ${numberOfPage} ${pluralize(
        "Page",
        numberOfPage
      )}`}</span>
    </a>
  </div>
);

export default Document;

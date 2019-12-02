import React from "react";
import pluralize from "pluralize";
import { Link } from "react-router-dom";

import images from "../images";

const Document = ({ name, numberOfPage, id }) => (
  <Link to={`/document/${id}`} className="document flex center pointer">
    <div>
      <img src={images.pdf} alt="Document Icon" width={40} />
    </div>

    <div className="document--info flex flex-direction--column text-navy">
      <span title={name}>
        {name.length > 30 ? `${name.substring(0, 30)}...` : name}
      </span>
      <span>{` ${numberOfPage} ${pluralize("Page", numberOfPage)}`}</span>
    </div>
  </Link>
);

export default Document;

import React from "react";

import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const SellingPointList = ({ sellingPoints, ...rest }) => (
  <ul {...rest}>
    {sellingPoints &&
      sellingPoints.map((sellingPoint, index) => (
        <li className="mt1 text-navy flex" key={index}>
          <span className="mr1">
            <IoIosCheckmarkCircleOutline />
          </span>
          <div>
            <strong>{sellingPoint.description}</strong>
          </div>
        </li>
      ))}
  </ul>
);

export default SellingPointList;

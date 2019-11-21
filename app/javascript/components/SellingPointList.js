import React from "react";

import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const SellingPointList = ({ sellingPoints, ...rest }) => (
  <div {...rest}>
    {sellingPoints &&
      sellingPoints.map((sellingPoint, index) => (
        <div className="mt1 text-navy flex" key={index}>
          <span className="mr1">
            <IoIosCheckmarkCircleOutline />
          </span>
          <div>
            <strong>{sellingPoint.description}</strong>
          </div>
        </div>
      ))}
  </div>
);

export default SellingPointList;

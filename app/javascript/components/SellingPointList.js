import React from "react";
import { withTranslation } from "react-i18next";

import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const SellingPointList = ({ sellingPoints, t, tReady, ...rest }) => (
  <div {...rest}>
    {sellingPoints &&
      sellingPoints.map((sellingPoint, index) => (
        <div className="mt1 text-navy fullwidth flex" key={index}>
          <span className="mr1">
            <IoIosCheckmarkCircleOutline />
          </span>
          <div>
            <strong>{t(sellingPoint.description)}</strong>
          </div>
        </div>
      ))}
  </div>
);

export default withTranslation()(SellingPointList);

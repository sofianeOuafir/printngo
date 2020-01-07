import React from "react";
import { withTranslation } from "react-i18next";

import SellingPointList from "./SellingPointList";

const AllPlanIncludes = ({ t }) => {
  const allPlanSellingPoints = [
    [
      {
        description: t("allPlanIncludes.sellingPoint1")
      },
      {
        description: t("allPlanIncludes.sellingPoint2")
      }
    ],
    [
      {
        description: t("allPlanIncludes.sellingPoint3")
      },
      {
        description: t("allPlanIncludes.sellingPoint4")
      }
    ],
    [
      {
        description: t("allPlanIncludes.sellingPoint5")
      },
      {
        description: t("allPlanIncludes.sellingPoint6")
      }
    ]
  ];
  return (
    <div className="px1 pb1">
      <h3 className="center text-navy">{t("allPlanIncludes.title")}</h3>
      <div className="flex all-plan-includes--selling-points-container justify-content--around">
        {allPlanSellingPoints.map((allPlanSellingPoints, index) => (
          <SellingPointList sellingPoints={allPlanSellingPoints} key={index} />
        ))}
      </div>
    </div>
  );
};

export default withTranslation()(AllPlanIncludes);

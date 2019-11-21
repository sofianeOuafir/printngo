import React from "react";

import SellingPointList from "./SellingPointList";

const allPlanSellingPoints = [
  [
    {
      description: "Ability to Print any document in A4 color or black."
    },
    {
      description: "Pick up your documents at the closest locations."
    }
  ],
  [
    {
      description: "High focus on confidentiality."
    },
    {
      description: "Store your document for printing even quicker next time."
    }
  ],
  [
    {
      description: "Find easily the closest pick up location."
    }
  ]
];

const AllPlanIncludes = () => (
  <div className="px1 pb1">
    <h3 className="center text-navy">All plan includes...</h3>
    <div className="flex all-plan-includes--selling-points-container justify-content--around">
      {allPlanSellingPoints.map((allPlanSellingPoints, index) => (
        <SellingPointList sellingPoints={allPlanSellingPoints} key={index} />
      ))}
    </div>
  </div>
);

export default AllPlanIncludes;

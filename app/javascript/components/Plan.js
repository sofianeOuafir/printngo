import React from "react";

const Plan = ({ sellingPoints, description, CallToAction, title }) => (
  <div style={{ height: "420px" }}>
    <h1 style={{ height: "50px" }} className="text-navy h3 center">
      {title}
    </h1>
    <h2 style={{ height: "50px" }} className="text-navy h5 center">
      <strong>{description}</strong>
    </h2>
    <div style={{ height: "50px" }} className="center">
      {CallToAction}
    </div>
    <ul style={{ height: "100px" }}>
      {sellingPoints.map((sellingPoint, index) => (
        <li className="mt1 text-navy" key={index}>
          {sellingPoint}
        </li>
      ))}
    </ul>
  </div>
);

export default Plan;

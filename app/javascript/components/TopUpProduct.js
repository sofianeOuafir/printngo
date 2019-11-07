import React from "react";
import { Link } from "react-router-dom";

const TopUpProduct = ({ CallToAction, topUpProduct }) => {
  const { sellingPoints, description, name, most_popular } = topUpProduct;
  return (
    <div
      className={`px1 pt1`}
      style={{
        height: "500px",
        background: `${most_popular && "rgba(255, 117, 124, 0.2)"}`
      }}
    >
      <div style={{ height: "50px" }}>
        <h1
          className={`m0
            text-navy
           h3 center`}
        >
          {name}
        </h1>
      </div>
      <div
        className="mb1 border--bottom border-color--navy pb1"
        style={{ height: "70px" }}
      >
        <h2 className="px1 text-navy h5 favourite-font-weight center">
          <strong>{description}</strong>
        </h2>
      </div>

      <div style={{ height: "50px" }} className="center">
        {CallToAction ? (
          <CallToAction />
        ) : (
          <Link
            to=""
            className={`button ${
              most_popular
                ? "button--pink"
                : "button--outline button-outline--pink"
            }`}
          >
            Buy Now
          </Link>
        )}
      </div>
      <ul style={{ height: "100px" }}>
        {sellingPoints &&
          sellingPoints.map((sellingPoint, index) => (
            <li className="mt1 text-navy h5" key={index}>
              {sellingPoint}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TopUpProduct;

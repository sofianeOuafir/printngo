import React from "react";
import { Link } from "react-router-dom";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const TopUpProduct = ({ CallToAction, topUpProduct }) => {
  const { selling_points, description, name, most_popular, id } = topUpProduct;
  return (
    <div>
      <div
        className={
          topUpProduct.most_popular &&
          "flex flex-direction--vertical justify-content--center align-items--center bg-pink text-white center"
        }
        style={{ height: "40px" }}
      >
        <span className="h4">
          {topUpProduct.most_popular ? "Most popular" : ""}
        </span>
      </div>
      <div
        className={`px1 pt1 border border-color--grey ${topUpProduct.most_popular &&
          "border-top--none"}`}
        style={{
          height: "630px",
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
              to={`/top-up/${id}`}
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
          {selling_points &&
            selling_points.map((sellingPoint, index) => (
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
      </div>
    </div>
  );
};

export default TopUpProduct;

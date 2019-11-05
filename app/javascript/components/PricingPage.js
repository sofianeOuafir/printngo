import React from "react";
import { Link } from "react-router-dom";

import Plan from "./Plan";

const plans = [
  {
    title: "Pay as you go",
    description: "Very Flexible",
    CallToAction: (
      <Link to="" className="button button--outline button-outline--pink">
        Print Now
      </Link>
    ),
    sellingPoints: [
      "/",
      "Minimum $0,50 per order",
      "Printing in black cost $0,25 per document.",
      "Printing in color cost $0,50 per document."
    ]
  },
  {
    title: "$9.99 Top up",
    description: "Get $11 of printing credit. Yes, An extra $1 for free!",
    CallToAction: (
      <Link to="" className="button button--outline button-outline--pink">
        Buy Now
      </Link>
    ),
    sellingPoints: [
      "Get an extra 1$ for free (+10% free)",
      "No minimum amount per order",
      "Printing in black would cost a bit less than $0,23 per document.",
      "Printing in color would cost a bit less than $0,46 per document"
    ]
  },
  {
    title: "$19.99 Top up",
    description: "Get $23 of printing credit. Yes, An extra $3 for free!",
    CallToAction: (
      <Link to="" className="button button--pink">
        Buy Now
      </Link>
    ),
    sellingPoints: [
      "You get an extra $3 of priting credit for free (+15% free)",
      "No minimum amount per order",
      "Printing in black would cost a bit less than $0,22 per document",
      "Printing in color would cost a bit less than $0,44 per document."
    ]
  },
  {
    title: "29.99 Top up",
    description: "Get $36 of printing credit. Yes, An extra $6 for free!",
    CallToAction: (
      <Link to="" className="button button--outline button-outline--pink">
        Buy Now
      </Link>
    ),
    sellingPoints: [
      "Get an extra 6 dollars of printing credit for free (+20% free)",
      "No minimum amount per order",
      "Printing in black would cost a bit less than $0,21 per document.",
      "Printing in color would cost a bit less than 0,42$ per document"
    ]
  }
];

const PricingPage = () => {
  return (
    <div>
      <div className="bg-navy center text-white">
        <h1 className="m0 pt3 h3">Simple, honest and affordable price</h1>
        <h2 className="pb3 h5">
          The most convenient printing solution adapted to your needs!
        </h2>
      </div>
      <div className="content-container">
        <div className="flex">
          {plans.map((plan, index) => {
            return (
              <div key={index} className="col-3">
                <div
                  className={`border border-color--navy ${
                    plans.length - 1 === index ? "" : "border-right--none"
                  }`}
                >
                  <Plan {...plan} />
                </div>
              </div>
            );
          })}
        </div>
        <div className="border border-color--navy mt1 text-navy">
          <h1 className="center">All plan includes...</h1>
          <ul>
            <li>Ability to Print any document in A4 color or black</li>
            <li>
              Pick up your documents at the closest any of our pick up locations
            </li>
          </ul>
          <ul>
            <li>High focus on confidentiality</li>
            <li>Store your document for printing even quicker next time</li>
          </ul>
          <ul>
            <li>Find closest pick up location.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;

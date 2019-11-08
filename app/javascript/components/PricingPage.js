import React from "react";
import axios from "axios";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

import TopUpProduct from "./TopUpProduct";
import Loader from "./Loader";
import UploadAndPrintButton from "./UploadAndPrintButton";

const payAsYouGoProduct = {
  name: "Pay as you go",
  description: "Very Flexible",
  selling_points: [
    {
      description: "/"
    },
    {
      description: "Minimum $0,50 per order"
    },
    {
      description: "Printing in black cost $0,25 per document."
    },
    {
      description: "Printing in color cost $0,50 per document."
    }
  ]
};

const allPlanSellingPoints = [
  [
    "Ability to Print any document in A4 color or black.",
    "Pick up your documents at the closest locations."
  ],
  [
    "High focus on confidentiality.",
    "Store your document for printing even quicker next time."
  ],
  ["Find easily the closest pick up location."]
];

const PayAsYouGoCallToAction = () => (
  <UploadAndPrintButton className="button button-outline button-outline--pink" />
);

class PricingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topUpProducts: [],
      loadingData: true
    };
  }
  componentDidMount() {
    axios.get("api/v1/top_up_products").then(response => {
      this.setState(() => ({
        topUpProducts: response.data,
        loadingData: false
      }));
    });
  }
  render() {
    const { loadingData, topUpProducts } = this.state;
    return (
      <div>
        <div className="center text-navy">
          <h1 className="m0 pt3 h3">Simple, honest and affordable price</h1>
          <h2 className="pb2 h5">
            The most convenient printing solution adapted to your needs!
          </h2>
        </div>
        {loadingData ? (
          <Loader />
        ) : (
          <div className="content-container">
            <div className="flex">
              <div className="col-3">
                <div style={{ paddingLeft: "2px", paddingRight: "2px" }}>
                  <TopUpProduct
                    CallToAction={PayAsYouGoCallToAction}
                    topUpProduct={payAsYouGoProduct}
                  />
                </div>
              </div>
              {topUpProducts.map((topUpProduct, index) => {
                return (
                  <div key={index} className="col-3">
                    <div style={{ paddingLeft: "2px", paddingRight: "2px" }}>
                      <TopUpProduct topUpProduct={topUpProduct} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div
              className="border border-color--grey text-navy mb3"
              style={{ marginTop: "3px" }}
            >
              <h1 className="center">All plan includes...</h1>
              <div>
                <ul className="flex justify-content--around">
                  {allPlanSellingPoints.map(allPlanSellingPoints => (
                    <div>
                      {allPlanSellingPoints.map(
                        (allPlanSellingPoint, index) => (
                          <li className="mt1 text-navy flex" key={index}>
                            <div className="mr1">
                              <IoIosCheckmarkCircleOutline />
                            </div>
                            <div>{allPlanSellingPoint}</div>
                          </li>
                        )
                      )}
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default PricingPage;

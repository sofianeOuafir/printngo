import React from "react";
import axios from "axios";

import TopUpProduct from "./TopUpProduct";
import Loader from "./Loader";
import UploadAndPrintButton from "./UploadAndPrintButton";

const payAsYouGoProduct = {
  name: "Pay as you go",
  description: "Very Flexible",
  sellingPoints: [
    "/",
    "Minimum $0,50 per order",
    "Printing in black cost $0,25 per document.",
    "Printing in color cost $0,50 per document."
  ]
};

const PayAsYouGoCallToAction = () => <UploadAndPrintButton className="button button-outline button-outline--pink" />;

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
              <div className={`border border-color--navy border-right--none`}>
                <TopUpProduct
                  CallToAction={PayAsYouGoCallToAction}
                  topUpProduct={payAsYouGoProduct}
                />
              </div>
              {topUpProducts.map((topUpProduct, index) => {
                return (
                  <div key={index} className="col-3">
                    <div
                      className={`border border-color--navy ${
                        topUpProducts.length - 1 === index
                          ? ""
                          : "border-right--none"
                      }`}
                    >
                      <TopUpProduct topUpProduct={topUpProduct} />
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
                  Pick up your documents at the closest any of our pick up
                  locations
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
        )}
      </div>
    );
  }
}

export default PricingPage;

import React from "react";
import axios from "axios";

import TopUpProduct from "./TopUpProduct";
import Loader from "./Loader";
import UploadAndPrintButton from "./UploadAndPrintButton";
import AllPlanIncludes from "./AllPlanIncludes";
import PageBanner from "./PageBanner";

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
        <PageBanner
          title="Simple, honest and affordable price"
          description="The most convenient printing solution adapted to your needs!"
        />

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
              className="mb3 border border-color--grey"
              style={{ marginTop: "3px" }}
            >
              <AllPlanIncludes />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default PricingPage;

import React from "react";
import axios from "axios";

import TopUpProduct from "./TopUpProduct";
import Loader from "./Loader";
import UploadAndPrintButton from "./UploadAndPrintButton";
import AllPlanIncludes from "./AllPlanIncludes";
import PageBanner from "./PageBanner";

const payAsYouGoProduct = {
  name: "Pay as you go",
  description: "Pay for what you need, whenever you want!",
  selling_points: [
    {
      description: "Very flexible, adapted for your needs."
    },
    {
      description: "Minimum $0,50 per order."
    },
    {
      description: "Printing in black cost $0,25 per page."
    },
    {
      description: "Printing in color cost $0,50 per page."
    }
  ]
};

const PayAsYouGoCallToAction = () => (
  <UploadAndPrintButton text="Instant Quote" className="button button-outline button-outline--pink" />
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
            <div className="flex products--container">
              <div className="col-3">
                <div className="fullheight" style={{ paddingLeft: "2px", paddingRight: "2px" }}>
                  <TopUpProduct
                    CallToAction={PayAsYouGoCallToAction}
                    topUpProduct={payAsYouGoProduct}
                  />
                </div>
              </div>
              {topUpProducts.map((topUpProduct, index) => {
                return (
                  <div key={index} className="col-3">
                    <div className="fullheight" style={{ paddingLeft: "2px", paddingRight: "2px" }}>
                      <TopUpProduct topUpProduct={topUpProduct} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div
              className=" mb3 border border-color--grey mt1"
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

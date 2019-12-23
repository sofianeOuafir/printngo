import React from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

import TopUpProduct from "./TopUpProduct";
import Loader from "./Loader";
import UploadAndPrintButton from "./UploadAndPrintButton";
import AllPlanIncludes from "./AllPlanIncludes";
import PageBanner from "./PageBanner";

const payAsYouGoProduct = {
  code: "payAsYouGo",
  selling_points: [
    {
      description: "payAsYouGo.sellingPoint1"
    },
    {
      description: "payAsYouGo.sellingPoint2"
    },
    {
      description: "payAsYouGo.sellingPoint3"
    },
    {
      description: "payAsYouGo.sellingPoint4"
    }
  ]
};

const PayAsYouGoCallToAction = () => {
  const { t } = useTranslation();
  return (
    <UploadAndPrintButton
      text={t("callToAction.instantQuote")}
      className="button button-outline button-outline--pink"
    />
  );
};

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
    const { t } = this.props;
    const { loadingData, topUpProducts } = this.state;
    return (
      <div>
        <PageBanner
          title={t("pricingPage.title")}
          description={t("pricingPage.description")}
        />

        {loadingData ? (
          <Loader />
        ) : (
          <div className="content-container">
            <div className="flex products--container">
              <div className="col-3">
                <div
                  className="fullheight"
                  style={{ paddingLeft: "2px", paddingRight: "2px" }}
                >
                  <TopUpProduct
                    CallToAction={PayAsYouGoCallToAction}
                    topUpProduct={payAsYouGoProduct}
                  />
                </div>
              </div>
              {topUpProducts.map((topUpProduct, index) => {
                return (
                  <div key={index} className="col-3">
                    <div
                      className="fullheight"
                      style={{ paddingLeft: "2px", paddingRight: "2px" }}
                    >
                      <TopUpProduct topUpProduct={topUpProduct} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className=" mb3 border border-color--grey mt1">
              <AllPlanIncludes />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default PricingPage;

import React from "react";
import axios from "axios";

import Loader from "./Loader";
import PageBanner from "./PageBanner";
import PartnerProduct from "./PartnerProduct";

class PartnerProductsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loadingData: true
    };
  }

  componentDidMount() {
    axios.get("/api/v1/partners/partner_products").then(response => {
      this.setState(() => ({
        products: response.data,
        loadingData: false
      }));
    });
  }

  render() {
    const { t } = this.props;
    const { loadingData, products } = this.state;
    return (
      <div className="content-container">
        <PageBanner
          title={t("partnerProductsPage.title")}
          description={t("partnerProductsPage.description")}
        />
        {loadingData ? (
          <Loader />
        ) : (
          <div className="flex justify-content--center border border-color--grey p1">
            {products.map((product, index) => (
              <div key={index} className="col-3 p1">
                <PartnerProduct product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default PartnerProductsPage;

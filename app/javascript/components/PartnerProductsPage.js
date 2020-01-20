import React from "react";
import axios from "axios";

import Loader from "./Loader";
import PageBanner from "./PageBanner";
import PartnerProductList from "./PartnerProductList";

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
          <div className="border border-color--grey">
            <PartnerProductList readOnly={false} products={products} />
          </div>
        )}
      </div>
    );
  }
}

export default PartnerProductsPage;

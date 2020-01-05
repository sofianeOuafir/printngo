import React from "react";

import PartnerList from "./PartnerList";
import { DEFAULT_ZOOM_MAP } from "../constants/constants";
import PageBanner from "./PageBanner";

class PrintShopNearMePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { t } = this.props;
    return (
      <div>
        <PageBanner
          title={t("printShopNearMePage.title")}
          description={t("printShopNearMePage.description")}
        />

        <div className="content-container">
          <PartnerList
            readOnly={true}
            mapCenter={{
              lat: t("partnerList.mapCenter.lat"),
              lng: t("partnerList.mapCenter.lng")
            }}
            defaultMapZoom={DEFAULT_ZOOM_MAP}
          />
        </div>
      </div>
    );
  }
}

export default PrintShopNearMePage;

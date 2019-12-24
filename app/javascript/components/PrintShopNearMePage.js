import React from "react";
import { connect } from "react-redux";

import PartnerList from "./PartnerList";
import { DEFAULT_ZOOM_MAP, TORONTO_LOCATION } from "../constants/constants";
import { startSetPartners } from "../actions/partners";
import Loader from "./Loader";
import PageBanner from "./PageBanner";

class PrintShopNearMePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: true
    };
  }

  componentDidMount() {
    const { startSetPartners } = this.props;
    startSetPartners().then(() => {
      this.setState(() => ({ loadingData: false }));
    });
  }

  render() {
    const { t } = this.props;
    return (
      <div>
        <PageBanner
          title={t('printShopNearMePage.title')}
          description={t('printShopNearMePage.description')}
        />

        {this.state.loadingData ? (
          <Loader />
        ) : (
          <div className="content-container">
            <PartnerList
              readOnly={true}
              mapCenter={TORONTO_LOCATION}
              defaultMapZoom={DEFAULT_ZOOM_MAP}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startSetPartners: () => dispatch(startSetPartners())
});
export default connect(null, mapDispatchToProps)(PrintShopNearMePage);

import React from "react";
import { connect } from "react-redux";

import PartnerList from "./PartnerList";
import { TORONTO_LOCATION, DEFAULT_ZOOM_MAP } from "./../constants/constants";
import { startSetPartners } from "../actions/partners";
import Loader from "./Loader";
import PageBanner from "./PageBanner";

class PickUpLocationsPage extends React.Component {
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
    return (
      <div>
        <PageBanner
          title="Our Pick Up Locations"
          description="Find the most convenient pick up point for printing your documents"
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
export default connect(null, mapDispatchToProps)(PickUpLocationsPage);

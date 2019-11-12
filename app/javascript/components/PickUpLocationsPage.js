import React from "react";
import { connect } from "react-redux";

import PartnerList from "./PartnerList";
import { TORONTO_LOCATION, DEFAULT_ZOOM_MAP } from "./../constants/constants";
import { startSetPartners } from "../actions/partners";
import Loader from "./Loader";

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
        <div className="center text-navy">
          <h1 className="m0 pt3 h3">Our Pick Up Locations</h1>
          <h2 className="pb2 h5">
            Find the most convenient pick up point for printing your documents
          </h2>
        </div>
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

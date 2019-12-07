import React from "react";
import { connect } from "react-redux";

import PartnerList from "./PartnerList";
import { DEFAULT_ZOOM_MAP } from "./../constants/constants";
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
    const partners = [
      {
        id: 1,
        name: "Convenience Plus (Coming Soon)",
        address: "232 Danforth Ave",
        city: "Toronto",
        postcode: "M4K 1N2",
        country: "Canada",
        lat: 43.6768938,
        lng: -79.3555156,
        opening_hours: "8 AM to 4 PM",
        firstname: "Sofiane",
        lastname: "Ouafir",
        email: "sofiane.ouafir@live.fr",
        fullname: "Sofiane Ouafir"
      },
      {
        id: 2,
        name: "Nails are you (Coming Soon)",
        address: "479 Broadview Ave, Toronto",
        city: "Toronto",
        postcode: "M4M 1J5",
        country: "Canada",
        lat: 43.6692522,
        lng: -79.3530043,
        opening_hours: "9 AM to 4:30 PM",
        firstname: "Alex",
        lastname: "Bloomberg",
        email: "alex.bloomberg@live.fr",
        fullname: "Alex Bloomberg"
      },
      {
        id: 3,
        name: "Revel Cafe (Coming Soon)",
        address: "348 Danforth Ave",
        city: "Toronto",
        postcode: "M4K 1N8",
        country: "Canada",
        lat: 43.6774397,
        lng: -79.3527105,
        opening_hours: "10 AM to 7 PM",
        firstname: "Alex",
        lastname: "Bloomberg",
        email: "alex.bloomberg@live.fr",
        fullname: "Alex Bloomberg"
      },
      {
        id: 4,
        name: "Sirkel Foods (Coming Soon)",
        address: "581 Danforth Ave",
        city: "Toronto",
        postcode: "M4K 1P9",
        country: "Canada",
        lat: 43.6785897,
        lng: -79.3467307,
        opening_hours: "9 AM to 5 PM",
        firstname: "Alex",
        lastname: "Bloomberg",
        email: "alex.bloomberg@live.fr",
        fullname: "Alex Bloomberg"
      },
      {
        id: 5,
        name: "Carmens Photoshop (Coming Soon)",
        address: "638 Pape Av",
        city: "Toronto",
        postcode: "M4K 3S3",
        country: "Canada",
        lat: 43.6767357,
        lng: -79.3439973,
        opening_hours: " 9 AM to 8 PM",
        firstname: "Alex",
        lastname: "Bloomberg",
        email: "alex.bloomberg@live.fr",
        fullname: "Alex Bloomberg"
      },
      {
        id: 6,
        name: "Anthony's Body Piercing & Tattoo (Coming Soon)",
        address: "607 Pape Ave",
        city: "Toronto",
        postcode: "M4K 3R9",
        country: "Canada",
        lat: 43.6760009,
        lng: -79.3436938,
        opening_hours: "10 AM to 8 PM",
        firstname: "Alex",
        lastname: "Bloomberg",
        email: "alex.bloomberg@live.fr",
        fullname: "Alex Bloomberg"
      },
      {
        id: 7,
        name: "Klomp's Home & Garden (Coming Soon)",
        address: "830 Pape Ave, East York",
        city: "Toronto",
        postcode: "M4K 3T5",
        country: "Canada",
        lat: 43.682958,
        lng: -79.3463642,
        opening_hours: "11 AM to 6:30 PM",
        firstname: "Alex",
        lastname: "Bloomberg",
        email: "alex.bloomberg@live.fr",
        fullname: "Alex Bloomberg"
      },
      {
        id: 8,
        name: "Shop 420 (Coming Soon)",
        address: "1145 Danforth Ave",
        city: "Toronto",
        postcode: "M4J 1M5",
        country: "Canada",
        lat: 43.6811946,
        lng: -79.3335996,
        opening_hours: "8:30 AM to 5:30 PM",
        firstname: "Alex",
        lastname: "Bloomberg",
        email: "alex.bloomberg@live.fr",
        fullname: "Alex Bloomberg"
      },
      {
        id: 9,
        name: "Sew & Save Centre (Coming Soon)",
        address: "36 Wagstaff Dr",
        city: "Toronto",
        postcode: "M4L 3W9",
        country: "Canada",
        lat: 43.6736126,
        lng: -79.3304911,
        opening_hours: "9:30 AM to 9 PM",
        firstname: "Alex",
        lastname: "Bloomberg",
        email: "alex.bloomberg@live.fr",
        fullname: "Alex Bloomberg"
      },
      {
        id: 10,
        name: "Knit Stitch (Coming Soon)",
        address: "1417 Danforth Ave",
        city: "Toronto",
        postcode: "M4J 1N2",
        country: "Canada",
        lat: 43.682529,
        lng: -79.3273501,
        opening_hours: "9 AM to 6:30 PM",
        firstname: "Alex",
        lastname: "Bloomberg",
        email: "alex.bloomberg@live.fr",
        fullname: "Alex Bloomberg"
      }
    ];
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
              partners={partners}
              readOnly={true}
              mapCenter={{ lat: 43.6767357, lng: -79.3439973 }}
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

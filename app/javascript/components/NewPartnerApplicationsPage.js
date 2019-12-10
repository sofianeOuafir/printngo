import React from "react";
import axios from "axios";

import PartnerApplicationSubNavBar from "./PartnerApplicationSubNavBar";
import PartnerApplicationList from "./PartnerApplicationList";
import Loader from "./Loader";
import { Link } from "react-router-dom";

class NewPartnerApplicationsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: true,
      partnerApplications: []
    };
  }

  componentDidMount() {
    axios
      .get("/api/v1/admins/partner_applications?archived=false")
      .then(response => {
        this.setState(() => ({
          partnerApplications: response.data,
          loadingData: false
        }));
      });
  }

  render() {
    const { partnerApplications, loadingData } = this.state;

    return loadingData ? (
      <Loader />
    ) : (
      <div className="content-container">
        <PartnerApplicationSubNavBar />
        <PartnerApplicationList partnerApplications={partnerApplications} />
        <Link to="/admin/partner-applications/new" className="button button--navy">Create New Application</Link>
      </div>
    );
  }
}

export default NewPartnerApplicationsPage;

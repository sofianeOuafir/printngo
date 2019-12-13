import React from "react";
import axios from "axios";

import PartnerApplicationList from "./PartnerApplicationList";
import PartnerApplicationSubNavBar from "./PartnerApplicationSubNavBar";
import Loader from "./Loader";

class ArchivedPartnerApplicationsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: true,
      partnerApplications: []
    };
  }

  componentDidMount() {
    axios.get("/api/v1/admins/partner_applications?archived=true").then(response => {
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
      </div>
    );
  }
}

export default ArchivedPartnerApplicationsPage;

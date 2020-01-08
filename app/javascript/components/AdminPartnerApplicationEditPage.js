import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import PartnerApplicationForm from "./PartnerApplicationForm";
import Loader from "./Loader";
import BackButton from "./BackButton";

class AdminPartnerApplicationsEditPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: true,
      partnerApplication: {}
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`/api/v1/admins/partner_applications/${id}`).then(response => {
      this.setState(() => ({
        loadingData: false,
        partnerApplication: response.data
      }));
    });
  }

  onSubmit = partnerApplication => {
    const { id } = this.state.partnerApplication;
    const { t } = this.props;
    return axios
      .patch(`/api/v1/admins/partner_applications/${id}`, partnerApplication)
      .then(() => {
        this.props.history.push("/admin/new-partner-applications");
      })
      .then(() => {
        toast.success(
          t("adminPartnerApplicationEditPage.successNotification"),
          {
            position: toast.POSITION.BOTTOM_RIGHT
          }
        );
      });
  };

  render() {
    const { partnerApplication, loadingData } = this.state;
    return loadingData ? (
      <Loader />
    ) : (
      <div className="content-container mb1">
        <div className="py1 flex justify-content--between">
          <BackButton />
        </div>

        <PartnerApplicationForm
          onSubmit={this.onSubmit}
          partnerApplication={partnerApplication}
        />
      </div>
    );
  }
}

export default withRouter(AdminPartnerApplicationsEditPage);

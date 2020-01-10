import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import PartnerApplicationForm from "./PartnerApplicationForm";
import BackButton from "./BackButton";

class AdminPartnerApplicationsNewPage extends React.Component {
  onSubmit = partnerApplication => {
    const { t } = this.props;
    return axios
      .post(`/api/v1/admins/partner_applications`, partnerApplication)
      .then(() => {
        this.props.history.push("/admin/new-partner-applications");
      })
      .then(() => {
        toast.success(t("adminPartnerApplicationNewPage.successNotification"), {
          position: toast.POSITION.BOTTOM_LEFT
        });
      });
  };

  render() {
    return (
      <div className="content-container mb1">
        <div className="py1">
          <BackButton />
        </div>

        <PartnerApplicationForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default withRouter(AdminPartnerApplicationsNewPage);

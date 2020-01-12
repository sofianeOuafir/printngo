import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

import TextInput from "./TextInput";
import Partner from "./Partner";
import PageBanner from "./PageBanner";
import { login } from "./../actions/auth";

class PartnerPromotePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      promotion: props.auth.promotion
    };
  }

  onPromotionChange = e => {
    const promotion = e.target.value;
    if (promotion.length <= 100) {
      this.setState(() => ({
        promotion
      }));
    }
  };

  onSubmit = e => {
    e.preventDefault();
    const { promotion } = this.state;
    const { login, t } = this.props;
    axios
      .patch("/api/v1/partners/promotions/current", {
        text: promotion
      })
      .then(response => {
        login(response.data.partner);
        toast.success(t("partnerPromotePage.successNotification"), {
          position: toast.POSITION.BOTTOM_LEFT
        });
      });
  };

  render() {
    const { auth, t } = this.props;
    const { promotion } = this.state;
    return (
      <div className="content-container">
        <PageBanner
          title={t("partnerPromotePage.title")}
          description={t("partnerPromotePage.description")}
        />
        <form
          className="flex form__input-container mb1"
          onSubmit={this.onSubmit}
        >
          <div className="col-8">
            <TextInput
              type="text"
              placeholder={t("partnerPromotePage.promotionPlaceHolder")}
              value={promotion}
              onChange={this.onPromotionChange}
            />
          </div>
          <div className="col-4">
            <button
              className={`fullwidth fullheight button button--navy button--no-border-radius`}
              text="Submit"
            >
              {t("partnerPromotePage.save")}
            </button>
          </div>
        </form>

        <Partner partner={auth} promotion={promotion} />
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  auth
});

const mapDispatchToProps = dispatch => ({
  login: partner => dispatch(login(partner))
});
export default connect(mapStateToProps, mapDispatchToProps)(PartnerPromotePage);

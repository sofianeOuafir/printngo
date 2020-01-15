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
      promotionText: props.auth.promotion_text,
      promotionLink: props.auth.promotion_link,
      errors: {
        promotionText: [],
        promotionLink: []
      }
    };
  }

  onPromotionTextChange = e => {
    const promotionText = e.target.value;
    if (promotionText.length <= 100) {
      this.setState(prevState => ({
        promotionText,
        errors: {
          ...prevState.errors,
          promotionText: []
        }
      }));
    }
  };
  onPromotionLinkChange = e => {
    const promotionLink = e.target.value;
    this.setState(prevState => ({
      promotionLink,
      errors: {
        ...prevState.errors,
        promotionLink: []
      }
    }));
  };

  onSubmit = e => {
    e.preventDefault();
    const { promotionText, promotionLink } = this.state;
    const { login, t } = this.props;
    axios
      .patch("/api/v1/partners/promotions/current", {
        text: promotionText,
        link: promotionLink
      })
      .then(response => {
        login(response.data.partner);
        this.setState(
          () => ({
            promotionText: response.data.text,
            promotionLink: response.data.link
          }),
          () => {
            toast.success(t("partnerPromotePage.successNotification"), {
              position: toast.POSITION.BOTTOM_LEFT
            });
          }
        );
      })
      .catch(e => {
        const errors = JSON.parse(e.response.data.errors);
        const { text, link } = errors;
        console.log(text, link);
        this.setState(prevState => ({
          errors: {
            ...prevState.errors,
            promotionText: text,
            promotionLink: link
          }
        }));
      });
  };

  render() {
    const { auth, t } = this.props;
    const { promotionText, promotionLink, errors } = this.state;
    return (
      <div className="content-container">
        <PageBanner
          title={t("partnerPromotePage.title")}
          description={t("partnerPromotePage.description")}
        />
        <form
          className="form__input-container mb1 border border-color--grey p1"
          onSubmit={this.onSubmit}
        >
          <div className="mb05">
            <TextInput
              label={t("partnerPromotePage.promotionTextLabel")}
              errors={errors.promotionText}
              type="text"
              placeholder={t("partnerPromotePage.promotionTextPlaceHolder")}
              value={promotionText}
              onChange={this.onPromotionTextChange}
            />
          </div>
          <div className="mb05">
            <TextInput
              label={t("partnerPromotePage.promotionLinkLabel")}
              errors={errors.promotionLink}
              type="text"
              placeholder={t("partnerPromotePage.promotionLinkPlaceHolder")}
              value={promotionLink}
              onChange={this.onPromotionLinkChange}
            />
          </div>
          <Partner
            partner={auth}
            promotionLink={promotionLink}
            promotionText={promotionText}
          />

          <button
            className={`fullwidth fullheight button button--navy button--no-border-radius`}
            text="Submit"
          >
            {t("partnerPromotePage.save")}
          </button>
        </form>
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

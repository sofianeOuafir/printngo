import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import OrderLayout from "./OrderLayout";
import {
  startUpdateClientCurrentOrder,
  startSetClientCurrentOrder
} from "../actions/orders";
import { startSetPartners } from "../actions/partners";
import Loader from "./Loader";
import { TORONTO_LOCATION, DEFAULT_ZOOM_MAP } from "./../constants/constants";
import PartnerList from "./PartnerList";

class OrderPickUpLocationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultMapZoom: DEFAULT_ZOOM_MAP,
      loadingData: true,
      mapCenter: TORONTO_LOCATION
    };
  }

  componentDidMount() {
    const { startSetClientCurrentOrder, startSetPartners } = this.props;
    Promise.all([startSetClientCurrentOrder(), startSetPartners()]).then(
      response => {
        const order = response[0].data;
        const { selected_partner } = order;
        const mapCenter = selected_partner
          ? { lat: selected_partner.lat, lng: selected_partner.lng }
          : this.state.mapCenter;
        this.setState(() => ({
          loadingData: false,
          mapCenter
        }));
      }
    );
  }

  onLocationSelect = partnerId => {
    this.props
      .startUpdateClientCurrentOrder({ selected_partner_id: partnerId })
      .then(() => {
        this.props.history.push("/order/payment");
      });
  };

  render() {
    const { loadingData, mapCenter, defaultMapZoom } = this.state;

    if (loadingData) {
      return <Loader />;
    } else {
      const { clientCurrentOrder, t } = this.props;
      const currentState = 2;
      return (
        <OrderLayout
          currentState={currentState}
          title={t("orderPickUpLocationPage.title")}
          info={t("orderPickUpLocationPage.info")}
          nextButton={{
            link: "/order/payment",
            text: t("orderPickUpLocationPage.nextButton"),
            disabled: clientCurrentOrder.selected_partner_id == null
          }}
        >
          <div className="content-container">
            <PartnerList
              readOnly={false}
              onLocationSelect={this.onLocationSelect}
              selectedPartner={clientCurrentOrder.selected_partner}
              mapCenter={mapCenter}
              defaultMapZoom={defaultMapZoom}
            />
          </div>

          <div className={`content-container mb3`}>
            <Link className="button button-outline--pink" to="/order/basket">
              &larr; {t("orderPickUpLocationPage.backToBasket")}
            </Link>
          </div>
        </OrderLayout>
      );
    }
  }
}

const mapStateToProps = state => ({
  partners: state.partners,
  clientCurrentOrder: state.clientCurrentOrder
});

const mapDispatchToProps = dispatch => ({
  startUpdateClientCurrentOrder: updates =>
    dispatch(startUpdateClientCurrentOrder(updates)),
  startSetClientCurrentOrder: () => dispatch(startSetClientCurrentOrder()),
  startSetPartners: () => dispatch(startSetPartners())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OrderPickUpLocationPage));

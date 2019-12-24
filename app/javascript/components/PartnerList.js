import React from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import MapElement from "./MapElement";
import Partner from "./Partner";
import { startSetPartners } from "../actions/partners";

class PartnerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapCenter: props.mapCenter,
      highlightedPartner: props.selectedPartner,
      selectedPartner: props.selectedPartner,
      sortingData: false,
      sortingError: "",
      permissionStatus: ""
    };
  }
  onFindClosest = () => {
    const { startSetPartners } = this.props;
    this.setState(
      () => ({ sortingData: true }),
      () => {
        new Promise((resolve, reject) => {
          try {
            if (navigator.geolocation) {
              navigator.permissions
                .query({ name: "geolocation" })
                .then(permissionStatus => {
                  this.setState(() => ({
                    permissionStatus: permissionStatus.state
                  }));
                })
                .then(() => {
                  navigator.geolocation.getCurrentPosition(
                    data => {
                      const { latitude: lat, longitude: lng } = data.coords;
                      startSetPartners({ lat, lng }).then(() => {
                        resolve();
                      });
                    },
                    () => {
                      reject(t("partnerList.PleaseEnableGeolocation"));
                    },
                    { enableHighAccuracy: true, timeout: 10000 }
                  );
                })
                .catch(e => {
                  console.log(e);
                });
            } else {
              reject(t("partnerList.geolocationNotSupported"));
            }
          } catch {
            reject(t("partnerList.geolocationNotSupported"));
          }
        })
          .then(() => {
            this.setState(() => ({ sortingData: false, sortingError: "" }));
          })
          .catch(e => {
            this.setState(() => ({ sortingData: false, sortingError: e }));
          });
      }
    );
  };
  onPartnerMouseEnter = partner => {
    this.setState(prevState => ({
      ...prevState,
      mapCenter: { lat: partner.lat, lng: partner.lng },
      highlightedPartner: partner
    }));
  };
  onPartnerMouseLeave = () => {
    const { selectedPartner } = this.state;
    if (selectedPartner) {
      const { lat, lng } = selectedPartner;
      this.setState(prevState => ({
        ...prevState,
        mapCenter: { lat, lng },
        highlightedPartner: selectedPartner
      }));
    } else {
      this.setState(prevState => ({ ...prevState, highlightedPartner: null }));
    }
  };
  render() {
    const {
      highlightedPartner,
      selectedPartner,
      sortingData,
      sortingError,
      permissionStatus
    } = this.state;
    const {
      showEachMap = false,
      readOnly = true,
      onLocationSelect = null,
      mapCenter,
      defaultMapZoom,
      partners,
      t
    } = this.props;
    return (
      <div className="flex partner-list">
        <div className="col-7 partner-list--list-container">
          <div>
            <a
              className="button button--navy button--no-border-radius mb1 fullwidth px0"
              onClick={this.onFindClosest}
            >
              {t("partnerList.sortFromClosestToFurthest")}
            </a>
          </div>

          {sortingData && permissionStatus && (
            <p className="h5 m0 mb1 text-navy">
              {permissionStatus == "granted"
                ? t("partnerList.loadingPleaseWait")
                : t("partnerList.PleaseEnableGeolocation")}
            </p>
          )}
          {sortingError && (
            <p className="h5 m0 mb1 text-navy">{sortingError}</p>
          )}
          {partners.length > 0 ? (
            partners.map((partner, index) => (
              <Partner
                showMap={showEachMap}
                highlighted={
                  (highlightedPartner &&
                    partner.id === highlightedPartner.id) ||
                  (!readOnly &&
                    selectedPartner &&
                    selectedPartner.id === partner.id)
                }
                readOnly={readOnly}
                onLocationSelect={onLocationSelect}
                partner={partner}
                onMouseLeave={this.onPartnerMouseLeave}
                onMouseEnter={() => this.onPartnerMouseEnter(partner)}
                key={index}
              />
            ))
          ) : (
            <p className="h5 text-navy m0">
              {t("partnerList.printingLocationsComingSoon")}
            </p>
          )}
        </div>
        <div className="col-5 partner-list--map-container pl1 sticky sticky--map">
          <MapElement
            defaultZoom={defaultMapZoom}
            defaultMapCenter={mapCenter}
            center={mapCenter}
            data={partners}
            highlightedElement={highlightedPartner}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (
  { partners: partnersFromReduxStore },
  { partners: partnersFromProps }
) => {
  const partners = partnersFromProps
    ? partnersFromProps
    : partnersFromReduxStore;
  return {
    partners
  };
};

const mapStateToDispatch = dispatch => ({
  startSetPartners: position => dispatch(startSetPartners(position))
});

export default connect(
  mapStateToProps,
  mapStateToDispatch
)(withTranslation()(PartnerList));

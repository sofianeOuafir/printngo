import React from "react";
import { withTranslation } from "react-i18next";

import { numberToDistance } from "../lib/distance";
import MapElement from "./MapElement";
import Promotion from "./Promotion";

const Partner = ({
  readOnly = true,
  promotionText = null,
  promotionLink = null,
  partner,
  onLocationSelect = null,
  highlighted = false,
  showMap = true,
  t,
  tReady,
  ...rest
}) => {
  return (
    <div
      {...rest}
      className={`${
        highlighted ? "bg-navy text-white" : ""
      } partner mb2 flex justify-content--between p2 border border-color--grey flex align-items--center`}
    >
      <div className="h5 fullwidth partner--left-container">
        <div className="col-12 flex justify-content--between align-items--center">
          <div className="flex flex-direction--column mr2 partner--details">
            <span className="h4 partner--name">{partner.name}</span>
            <span className="pt1">
              {partner.address} {partner.city} {partner.postcode}
            </span>
            <span>
              {t("partner.openingHours")}: {partner.opening_hours}
            </span>
            <Promotion
              className={`mt1 text-leaf`}
              text={
                promotionText !== null ? promotionText : partner.promotion_text
              }
              link={
                promotionLink !== null ? promotionLink : partner.promotion_link
              }
            />

            <div className="pt1">
              {partner.distance_to_user_position && (
                <span className="mr1 text-leaf">
                  {t("partner.distanceAway", {
                    distance: numberToDistance(
                      partner.distance_to_user_position
                    )
                  })}
                </span>
              )}
              <a
                className={`${highlighted ? "text-white" : "text-navy"}`}
                target="_blank"
                href={`https://www.google.com/maps/search/?api=1&query=${partner.lat},${partner.lng}`}
              >
                {t("partner.seeItinerary")}
              </a>
            </div>
          </div>
          {!readOnly && (
            <div>
              <a
                className={`button pointer ${
                  highlighted ? "button-outline" : "button--navy"
                }`}
                onClick={() => onLocationSelect(partner.id)}
              >
                {t("partner.select")}
              </a>
            </div>
          )}
        </div>
      </div>
      {readOnly && showMap && (
        <div
          className="col-4 fullwidth partner-map--container"
          style={{ height: "200px" }}
        >
          <MapElement
            defaultZoom={14}
            defaultCenter={{ lat: partner.lat, lng: partner.lng }}
            center={{ lat: partner.lat, lng: partner.lng }}
            data={[partner]}
          />
        </div>
      )}
    </div>
  );
};

export default withTranslation()(Partner);

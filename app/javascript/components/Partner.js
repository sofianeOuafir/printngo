import React from "react";

import { numberToDistance } from "../lib/distance";
import MapElement from "./MapElement";

const Partner = ({
  readOnly = true,
  partner,
  onLocationSelect = null,
  highlighted = false,
  showMap = true,
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
            <span>Opening Hours: {partner.opening_hours}</span>
            <div className="pt1">
              {partner.distance_to_user_position && (
                <span className="mr1 text-pink">{`${numberToDistance(
                  partner.distance_to_user_position
                )} away`}</span>
              )}
              <a
                className={`${highlighted ? "text-white" : "text-navy"}`}
                target="_blank"
                href={`https://www.google.com/maps/search/?api=1&query=${partner.lat},${partner.lng}`}
              >
                See Itinerary
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
                Select
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

export default Partner;

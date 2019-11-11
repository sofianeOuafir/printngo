import React from "react";

import { numberToDistance } from "../lib/distance";
import MapElement from "./MapElement";

const Partner = ({
  readOnly = true,
  partner,
  onLocationSelect,
  order,
  highlighted = false,
  ...rest
}) => {
  const highlight =
    (readOnly === false && order.selected_partner_id === partner.id) ||
    highlighted;
  return (
    <div
      {...rest}
      className={`${
        highlight ? "bg-navy text-white" : ""
      } mb2 flex justify-content--between p2 border border-color--grey flex align-items--center`}
    >
      <div className="h5 col-8">
        <div className="flex flex-direction--column mr2">
          <span className="h4">{partner.name}</span>
          <span className="pt1">
            {partner.address} {partner.city} {partner.postcode}
          </span>
          <span>Opening Hours: {partner.opening_hours}</span>
          <div className="pt1">
            {partner.distance_to_user_position && (
              <span className="mr1">{`${numberToDistance(
                partner.distance_to_user_position
              )} away`}</span>
            )}
            <a
              className={`${highlight ? "text-white" : "text-navy"}`}
              target="_blank"
              href={`https://www.google.com/maps/search/?api=1&query=${partner.lat},${partner.lng}`}
            >
              See Itinerary
            </a>
          </div>
        </div>
      </div>
      {readOnly ? (
        <div className="col-4" style={{ height: "200px" }}>
          <MapElement
            defaultZoom={14}
            defaultCenter={{ lat: partner.lat, lng: partner.lng }}
            center={{ lat: partner.lat, lng: partner.lng }}
            data={[partner]}
          />
        </div>
      ) : (
        <div>
          <a
            className={`button pointer ${
              highlight ? "button-outline" : "button--navy"
            }`}
            onClick={() => onLocationSelect(partner.id)}
          >
            Select
          </a>
        </div>
      )}
    </div>
  );
};

export default Partner;

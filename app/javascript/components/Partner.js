import React from 'react';

import { numberToDistance } from './../utils/distance';

const Partner = ({ readOnly = true, partner, onLocationSelect, order, ...rest }) => {
  const selectedPartner = order.partner_id === partner.id;
  return (
    <div { ...rest } className={`${selectedPartner ? 'bg-navy text-white' : ''} pointer mb2 flex justify-content--between p2 border border-color--grey flex align-items--center`} >
      <div className="flex h5">
        <div className="flex flex-direction--column mr2">
          <span>{partner.name}</span>
          <span>{partner.address}</span>
          <span>{partner.city}</span>
          <span>{partner.postcode}</span>
          {partner.distance_to_user_position && <span>{`${numberToDistance(partner.distance_to_user_position)} away`}</span>}
          <a className={`${selectedPartner ? 'text-white' : 'text-navy'}`} target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${partner.lat},${partner.lng}`}>See Itinerary</a>
        </div>
        <span>Opening Hours: {partner.opening_hours}</span>
      </div>
      { 
        readOnly ? (
          <div>
            map
          </div>
        ) : (
          <div>
            <a className={`button pointer ${selectedPartner ? 'button-outline' : 'button--navy'}`} onClick={() => onLocationSelect(partner.id)}>Select</a>
          </div>
        )
      }

    </div>
  )
}

export default Partner;
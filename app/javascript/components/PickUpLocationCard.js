import React from 'react';

import { Link } from 'react-router-dom';


const PickUpLocationCard = ({ partner, readOnly = false }) => {
  const { name, address, city, postcode, opening_hours } = partner;
  return (
    <div className="p2 border border-color--grey mb2">
      <h2 className="h5 text-navy favourite-font-weight">Pick up Location</h2>
      <div className="flex flex flex-direction--column mb1">
        <div className="flex flex-direction--column">
          <span>{`${name}`}</span>
          <span><strong>Address: </strong>{`${address} ${postcode} ${city}`}</span>
          <span><strong>Opening hours: </strong>{opening_hours}</span>
        </div>
          {!readOnly && 
          <div class="mt1">
            <Link to="/order/pick-up-location" className="button button-outline button-outline--pink">&larr; Select Another Pick up Location</Link>
          </div>}
      </div>
    </div>
  )
}

export default PickUpLocationCard;
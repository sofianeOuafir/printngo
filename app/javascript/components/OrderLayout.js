import React, { Fragment } from "react"
import { Link } from 'react-router-dom';

import Loader from './Loader';

const OrderLayout = ({ title, info = null, children, nextButton = null, renderPage }) => (
  <Fragment>
    <div className="order-navbar">
      <div className="content-container">
        <Link to="#" className="website-name">Print N' Go</Link>
      </div>
    </div>
    { renderPage ? (
      <Fragment>
        <div className="my2 content-container flex justify-content--between align-items--center sticky bg-white">
          <h1 className="h3 text-navy favourite-font-weight">{title}</h1>
          {info && <span className="h4 text-navy">{info}</span>}
          { nextButton && <Link style={nextButton.disabled ? { pointerEvents: "none" } : null}  className={`button ${nextButton.disabled ? 'button--grey' : 'button--pink'}`} to={nextButton.link}>{nextButton.text}  &rarr;</Link> }
        </div>
        <div className="mb3 pb3">
          {children}
        </div>
      </Fragment>
    ) : (
      <Loader />
    ) }

  </Fragment>
)

export default OrderLayout

import React, { Fragment } from "react"
import { Link } from 'react-router-dom';

const OrderLayout = ({ title, children, nextButtonLink, nextButtonText, prevButtonLink, prevButtonText }) => (
  <Fragment>
    <div className="order-navbar content-container">
      <Link className="website-name">Print N' Go</Link>
    </div>
    <div className="content-container">
      <h1 className="h3 favourite-font-weight">{title}</h1>
    </div>

    {children}

    <div className="content-container">
      { prevButtonLink && prevButtonText && <Link to={prevButtonLink}>{prevButtonText}</Link> }
      { nextButtonLink && nextButtonText && <Link to={nextButtonLink}>{nextButtonText}</Link> }
    </div>
  </Fragment>
)

export default OrderLayout

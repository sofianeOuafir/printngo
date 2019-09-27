import React, { Fragment } from "react"
import { Link } from 'react-router-dom';

const OrderLayout = ({ title, children, nextButtonLink, nextButtonText, prevButtonLink, prevButtonText }) => (
  <Fragment>
    <Link to="/">Print N' Go</Link>
    <h1>{title}</h1>
    {children}
    { prevButtonLink && prevButtonText && <Link to={prevButtonLink}>{prevButtonText}</Link> }
    { nextButtonLink && nextButtonText && <Link to={nextButtonLink}>{nextButtonText}</Link> }
  </Fragment>
)

export default OrderLayout

import React, { Fragment } from "react"
import { Link } from 'react-router-dom';
import Steps, { Step } from 'rc-steps';

import Loader from './Loader';

const OrderLayout = ({ title, info = null, children, nextButton = null, currentState }) => (
  <Fragment>
    <div className="order-navbar">
      <div className="content-container">
        <Link to="#" className="website-name">Print N' Go</Link>
      </div>
    </div>
    <div className="py2 content-container sticky bg-white">
      <Steps current={currentState} direction="horizontal" >
        <Step title="Upload"/>
        <Step title="Basket"/>
        <Step title="Pick Location"/>
        <Step title="Payment"/>
        <Step title="Done"/>
      </Steps>
      <div className="flex justify-content--between align-items--center">
        <h1 className="h3 text-navy favourite-font-weight">{title}</h1>
        {info && <span className="h4 text-navy">{info}</span>}
        { nextButton && <Link style={nextButton.disabled ? { pointerEvents: "none" } : null}  className={`button ${nextButton.disabled ? 'button--grey' : 'button--pink'}`} to={nextButton.link}>{nextButton.text}  &rarr;</Link> }
      </div>
    </div>
    <div className="mb3 pb3">
      {children}
    </div>
  </Fragment>
)

export default OrderLayout

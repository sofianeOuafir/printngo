import React, { Fragment } from "react"
import { Link } from 'react-router-dom';

const OrderLayout = (props) => (
  <Fragment>
  <Link to="/">Print N' Go</Link>
    {props.children}
  </Fragment>
)

export default OrderLayout

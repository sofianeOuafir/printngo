import React, { Fragment } from "react"

const OrderLayout = (props) => (
  <Fragment>
  <div>Print N' Go</div>
    {props.children}
  </Fragment>
)

export default OrderLayout

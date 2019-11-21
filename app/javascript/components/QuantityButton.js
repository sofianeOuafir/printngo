import React from "react";
import { Link } from "react-router-dom";

const QuantityButton = ({ Icon, ...props }) => (
  <Link to="/" className="pointer" {...props}>
    <Icon className="quantity-button text-navy" />
  </Link>
);

export default QuantityButton;

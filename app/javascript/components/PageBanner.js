import React from "react";

const PageBanner = ({ title, description }) => (
  <div className="flex flex-direction--column align-items--center text-navy">
    <h1 className="m0 pt3 h3">{title}</h1>
    <h2 className="halfwidth center pb2 h5">{description}</h2>
  </div>
);

export default PageBanner;

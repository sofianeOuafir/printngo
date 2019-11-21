import React from "react";

const PageBanner = ({ title, description }) => (
  <div className="content-container mb1 flex flex-direction--column align-items--center text-navy">
    <h1 className="page-banner--title m0 pt3 h3 center">{title}</h1>
    <h2 className="fullwidth page-banner--description center h5">{description}</h2>
  </div>
);

export default PageBanner;

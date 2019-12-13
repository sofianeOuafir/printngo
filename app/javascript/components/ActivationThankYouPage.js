import React from "react";
import { Link } from "react-router-dom";

import images from "./../images";

const ActivationThankYouPage = () => {
  return (
    <div className="mx1 mt1 content-container border border-color--grey h5 flex justify-content--center">
      <div className="my2">
        <div className="center">
          <img src={images.success} alt="Success Icon" width={80} />
        </div>
        <h1 className="h4 center thank-you-page--title">
          Your account is activated!
        </h1>
        <Link className="button button--navy fullwidth px0" to={`/partner/login`}>
          Login Now
        </Link>
      </div>
    </div>
  );
};

export default ActivationThankYouPage;

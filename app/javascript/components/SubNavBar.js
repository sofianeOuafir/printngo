import React from "react";
import { withRouter, Link } from "react-router-dom";

const SubNavBar = ({ location, links }) => {
  const { pathname } = location;
  return (
    <div className="my1 flex orders-page-navbar">
      {links.map(({ url, text }, index) => (
        <Link
          key={index}
          to={url}
          className={`mr1 button ${
            pathname == url
              ? "button--navy"
              : "button-outline button-outline--navy"
          } `}
        >
          {text}
        </Link>
      ))}
    </div>
  );
};

export default withRouter(SubNavBar);

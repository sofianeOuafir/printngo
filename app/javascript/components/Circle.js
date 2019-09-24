import React from "react"
import PropTypes from "prop-types"

const Circle = (props) => {
  var circleStyle = {
    padding:10,
    margin:20,
    display:"inline-block",
    borderRadius: "50%",
    width:100,
    height:100,
  };
  return (
    <div className="border border-color--white" style={circleStyle}>
      <span className="h2 fullheight flex justify-content--center align-items--center ">
        {props.number}
      </span>
    </div>
  );
}

export default Circle

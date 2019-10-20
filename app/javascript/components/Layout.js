import React from "react"
import Navbar from "./Navbar"
import ScrollUpButton from "react-scroll-up-button";

class Layout extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Navbar />
        { this.props.children }
        <ScrollUpButton />
      </React.Fragment>
    );
  }
}

export default Layout

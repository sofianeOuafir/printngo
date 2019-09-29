import React from "react"
import { Link } from 'react-router-dom';

import UploadAndPrintButton from './UploadAndPrintButton';

class Navbar extends React.Component {
  render () {
    return (
      <div id="navbar" className="navbar">
        <div className="content-container">
          <Link className="website-name" to="/">Print N' Go</Link>
          <Link to="/">How it works?</Link>
          <Link to="/">Why Print n' go?</Link>
          <Link to="/">Pricing</Link>
          <UploadAndPrintButton />
          <Link to="/become-partner">Become Partner</Link>
          <Link to="/">Sign In</Link>
          <Link to="/">Sign Up</Link>
        </div>
      </div>
    );
  }
}

export default Navbar

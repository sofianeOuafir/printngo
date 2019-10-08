import React, { Fragment } from "react"
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { startLogout } from './../actions/auth';
import UploadAndPrintButton from './UploadAndPrintButton';

class Navbar extends React.Component {
  onLogout = () => {
    this.props.startLogout();
  }

  render () {
    const { authenticated, firstname } = this.props.auth;
    return (
      <div style={{ height: '100px' }} className="navbar bg-navy flex justify-content--around align-items--center fullwidth">
        <div className="content-container">
          <Link className="website-name" to="/">Print N' Go</Link>
          {authenticated ? (
            <Fragment>
              <Link to="/documents">Documents</Link>
              <Link to="/orders">Orders</Link>
              <UploadAndPrintButton />
              <Link to="/">{ firstname }</Link>
              <Link to="/" onClick={this.onLogout}>Log out</Link>
            </Fragment>
          ) : (
            <Fragment>  
              <Link to="/">How it works?</Link>
              <Link to="/">Why Print n' go?</Link>
              <Link to="/">Pricing</Link>
              <UploadAndPrintButton />
              <Link to="/become-partner">Become Partner</Link>
              <Link to="/login">Sign In</Link>
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

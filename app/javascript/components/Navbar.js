import React, { Fragment } from "react"
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { startLogout } from './../actions/auth';
import { startSetOrder } from './../actions/orders';
import UploadAndPrintButton from './UploadAndPrintButton';
import SignInLink from './SignInLink';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: true
    }
  }
  componentDidMount() {
    this.props.startSetOrder().then(() => {
      this.setState(() => ({ loadingData: false }))
    })
  }

  onLogout = () => {
    this.props.startLogout().then(() => {
      this.props.history.push('/')
      location.reload()
    })
  }

  render () {
    const { auth, order } = this.props;
    const { authenticated, firstname } = auth;
    return (
      <div style={{ height: '75px' }} className="navbar bg-navy fullwidth flex align-items--center border--bottom border-color--white">
        <div className="content-container flex justify-content--between align-items--center fullwidth">
          <div>
            <Link className="website-name" to="/">Print N' Go</Link>
          </div>
          <div>
            {authenticated ? (
              <Fragment>
                <Link to="/documents">Documents</Link>
                <Link to="/orders">Orders</Link>
                <UploadAndPrintButton />
                <Link to="/become-partner">Become Partner</Link>
                <Link to="/">{ firstname }</Link>
                <Link to="#" onClick={this.onLogout}>Log out</Link>
              </Fragment>
            ) : (
              <Fragment>  
                <Link to="/">How it works?</Link>
                <Link to="/">Why Print n' go?</Link>
                <Link to="/">Pricing</Link>
                <UploadAndPrintButton />
                <Link to="/become-partner">Become Partner</Link>
                <SignInLink />
              </Fragment>
            )}
            <Link to="/order/basket">
              <span className="text-orange">Basket ({this.state.loadingData ? 0 : order.number_of_items})</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  order: state.order
})

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
  startSetOrder: () => dispatch(startSetOrder())
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));

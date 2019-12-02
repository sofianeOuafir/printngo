import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { setClientOrder } from "./../actions/orders";

import { fromCentsToDollars } from "./../lib/money";
import images from "./../images";
import Loader from "./Loader";
import UploadAndPrintButton from "./UploadAndPrintButton";

class TopUpOrderThankYouPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: true
    };
  }

  componentDidMount() {
    const { setClientOrder } = this.props;
    axios
      .get(`/api/v1/users/top_up_orders/${this.props.match.params.id}`)
      .then(response => {
        setClientOrder(response.data);
        this.setState(() => ({ loadingData: false }));
      });
  }

  render() {
    if (this.state.loadingData) {
      return <Loader />;
    } else {
      const { clientOrder } = this.props;
      const { invoice, user } = clientOrder;

      return (
        <div className="mt3 content-container border border-color--grey h5 flex justify-content--center">
          <div className="my2">
            <div className="center">
              <img src={images.success} alt="Success Icon" width={100} />
            </div>
            <h1 className="h4 center">Payment Success!</h1>

            <p>
              Thank you {user.firstname}! Your wallet has been successful
              credited. Your balance is now{" "}
              {fromCentsToDollars(user.wallet_balance)}. Happy Printing!
            </p>

            <div className="flex justify-content--between">
              <Link
                className="mt3 button button-outline--pink"
                to={`/invoice/${invoice.id}`}
              >
                See Invoice
              </Link>
              <UploadAndPrintButton className="mt3 button button--pink" />
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapDispatchToProps = dispatch => ({
  setClientOrder: order => dispatch(setClientOrder(order))
});
const mapStateToProps = state => ({
  clientOrder: state.clientOrder
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopUpOrderThankYouPage);

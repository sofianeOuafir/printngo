import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import axios from 'axios';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  async submit(e) {
    let {token} = await this.props.stripe.createToken({name: "Name"});
    axios.post("/api/v1/payments", {
      token: token.id,
      foo: 'bar'
    }).then((response) => {
      console.log(response);
      console.log("Purchase Complete!")
    }).catch((e) => {
      console.log(e);
    })
  }

  render() {
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Purchase</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
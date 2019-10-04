import React from "react";
import ReactDOM from 'react-dom';
import PropTypes from "prop-types"
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import { setOrderItems } from './../actions/orderItems';
import { setProducts } from './../actions/products';
import { setOrder } from './../actions/orders';
import { setPartners } from './../actions/partners';
import { startGetCurrentUser } from './../actions/auth';

import PartnerPage from './PartnerPage';
import HomePage from './HomePage';
import PickUpLocationPage from './PickUpLocationPage';
import BasketPage from './BasketPage';
import configureStore from './../configureStore';
import PaymentPage from './PaymentPage';
import Loader from './Loader';
import ThankYouPage from './ThankYouPage';
import LoginPage from './LoginPage';

const store = configureStore();

class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => <HomePage />}/>
            <Route path="/become-partner" render={() => <PartnerPage />  }/>
            <Route path="/order/basket" render={() => <BasketPage />  }/>
            <Route path="/order/pick-up-location" render={() => <PickUpLocationPage />  }/>
            <Route path="/order/payment" render={() => <PaymentPage />  }/>
            <Route path="/order/thank-you" render={() => <ThankYouPage />  }/>
            <Route path="/login" render={() => <LoginPage />  }/>
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

let hasRendered = false;
const renderApp = () => {
  if(!hasRendered) {
    ReactDOM.render(<App />, document.getElementById('app'));
    hasRendered = true;
  }
}

Promise.all([axios.get('/api/v1/products'), axios.get('/api/v1/orders/undefined'), axios.get('/api/v1/partners'), store.dispatch(startGetCurrentUser())]).then(([responseProducts, responseOrder, responsePartners]) => {
  store.dispatch(setOrder(responseOrder.data));
  store.dispatch(setOrderItems(responseOrder.data.order_items));
  store.dispatch(setProducts(responseProducts.data));
  store.dispatch(setPartners(responsePartners.data));
  renderApp();
})

export default Loader

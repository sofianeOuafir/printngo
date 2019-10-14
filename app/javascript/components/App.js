import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

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
import OrdersPage from './OrdersPage';
import DocumentsPage from './DocumentsPage';
import 'react-toastify/dist/ReactToastify.css';

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
            <Route path="/order/:id/thank-you" render={() => <ThankYouPage />  }/>
            <Route path="/orders" render={() => <OrdersPage />  }/>
            <Route path="/documents" render={() => <DocumentsPage />  }/>
            <Route path="/login" render={() => <LoginPage />  }/>
          </Switch>
          <ToastContainer autoClose={2000} />
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

store.dispatch(startGetCurrentUser()).then(() => {
  renderApp();
})

export default Loader

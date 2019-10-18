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
import OrderShowPage from './OrderShowPage';
import 'react-toastify/dist/ReactToastify.css';
import PublicRoute from '../routers/PublicRoute';
import PrivateRoute from '../routers/PrivateRoute';

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
            <Route path="/order/:id/thank-you" render={() => <PrivateRoute component={ThankYouPage} />  }/>
            <Route path="/orders" render={() => <PrivateRoute component={OrdersPage} />  }/>
            <Route path="/documents" render={() => <PrivateRoute component={DocumentsPage} />  }/>
            <Route path="/login" render={() => <PublicRoute component={LoginPage} />  }/>
            <Route path="/order/:id" render={() => <PrivateRoute component={OrderShowPage} />  }/>
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

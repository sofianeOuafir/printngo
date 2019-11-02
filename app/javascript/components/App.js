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
import UserLoginPage from './UserLoginPage';
import OrdersPage from './OrdersPage';
import DocumentsPage from './DocumentsPage';
import OrderShowPage from './OrderShowPage';
import 'react-toastify/dist/ReactToastify.css';
import PublicRoute from '../routers/PublicRoute';
import PrivateRoute from '../routers/PrivateRoute';
import InvoicePage from './InvoicePage';
import PartnerLoginPage from './PartnerLoginPage';
import PartnerHomePage from './PartnerHomepage';
import PartnerOrderPage from './PartnerOrderPage';
import OrderAwaitingConfirmationPage from './OrderAwaitingConfirmationPage';
import PrintedOrderPage from './PrintedOrderPage';
import PartnerLocationPage from './PartnerLocationPage';

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
            <Route path="/login" render={() => <PublicRoute component={UserLoginPage} />  }/>
            <Route path="/order/:id" render={() => <PrivateRoute component={OrderShowPage} />  }/>
            <Route path="/invoice/:id" render={() => <PrivateRoute component={InvoicePage} /> } />
            <Route path="/partner/login" render={() => <PublicRoute component={PartnerLoginPage} /> } />
            <Route exact path="/partner" render={() => <PrivateRoute component={PartnerHomePage} /> } />
            <Route path="/partner/order/:secretCode" render={() => <PrivateRoute component={PartnerOrderPage} /> } />
            <Route path="/partner/awaiting-confirmation" render={() => <PrivateRoute component={OrderAwaitingConfirmationPage} /> } />
            <Route path="/partner/printed-orders" render={() => <PrivateRoute component={PrintedOrderPage} /> } />
            <Route path="/partner/location" render={() => <PrivateRoute component={PartnerLocationPage} /> } />
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

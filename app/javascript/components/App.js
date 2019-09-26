import React from "react"
import PropTypes from "prop-types"
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import PartnerPage from './PartnerPage';
import HomePage from './HomePage';
import BasketPage from './BasketPage';
import configureStore from './../configureStore';
const store = configureStore();

class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => <HomePage />}/>
            <Route path="/become-partner" render={() => <PartnerPage />  }/>
            <Route path="/basket" render={() => <BasketPage />  }/>
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App

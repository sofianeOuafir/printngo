import {
  createStore, combineReducers, applyMiddleware, compose
} from 'redux';
import thunk from 'redux-thunk';

import orderItemsReducer from './reducers/orderItems';
import productsReducer from './reducers/products';
import ordersReducer from './reducers/orders';
import partnersReducer from './reducers/partners';
import authReducer from './reducers/auth';

let composeEnhancers;
try {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
} catch {
  composeEnhancers = compose;
}

const initialState = {
  things: [{
    foo: 'bar'
  }]
};

export default function (initData) {
  const store = createStore(
    combineReducers({
      orderItems: orderItemsReducer,
      products: productsReducer,
      order: ordersReducer,
      partners: partnersReducer,
      auth: authReducer
    }),
    initData,
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
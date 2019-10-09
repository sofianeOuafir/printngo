import {
  createStore, combineReducers, applyMiddleware, compose
} from 'redux';
import thunk from 'redux-thunk';

import orderItemsReducer from './reducers/orderItems';
import productsReducer from './reducers/products';
import ordersReducer from './reducers/orders';
import partnersReducer from './reducers/partners';
import authReducer from './reducers/auth';
import clientOrdersReducer from './reducers/clientOrders';
import documentsReducer from './reducers/documents';

let composeEnhancers;
try {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
} catch {
  composeEnhancers = compose;
}

export default function (initData) {
  const store = createStore(
    combineReducers({
      orderItems: orderItemsReducer,
      products: productsReducer,
      order: ordersReducer,
      partners: partnersReducer,
      auth: authReducer,
      clientOrders: clientOrdersReducer,
      documents: documentsReducer
    }),
    initData,
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
import {
  createStore, combineReducers, applyMiddleware, compose
} from 'redux';
import thunk from 'redux-thunk';

import orderItemsReducer from './reducers/orderItems';
import productsReducer from './reducers/products';
import clientCurrentorderReducer from './reducers/clientCurrentOrder';
import partnersReducer from './reducers/partners';
import authReducer from './reducers/auth';
import clientOrdersReducer from './reducers/clientOrders';
import documentsReducer from './reducers/documents';
import clientOrderReducer from './reducers/clientOrder';
import partnerOrderReducer from './reducers/partnerOrder';
import partnerOrdersReducer from './reducers/partnerOrders';

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
      partners: partnersReducer,
      auth: authReducer,
      documents: documentsReducer,
      clientCurrentOrder: clientCurrentorderReducer,
      clientOrders: clientOrdersReducer,
      clientOrder: clientOrderReducer,
      partnerOrder: partnerOrderReducer,
      partnerOrders: partnerOrdersReducer
    }),
    initData,
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
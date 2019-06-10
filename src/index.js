import React from "react";
import ReactDOM from "react-dom";

import {Provider} from "react-redux";
import {createStore, applyMiddleware, compose} from "redux";
import reducer from "./components/store/reducer";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = store => {
  return next => {
    return action => {
      console.log("[Middleware] Dispatching", action);
      const res = next(action);
      console.log("[Middleware] next state", store.getState());
      return res;
    };
  };
};

const store = createStore(reducer, composeEnhancers(applyMiddleware(logger)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

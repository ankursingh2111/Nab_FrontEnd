import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { frontEndReducer, frontEndActions } from "./reducers/reducer";
import getDataSaga from "./saga/getDataSaga";
import "./index.css";
import App from "./App";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(frontEndReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(getDataSaga);
store.dispatch(frontEndActions.getProfitDateList());
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

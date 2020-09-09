import React from "react";
import ReactDOM from "react-dom";
import App from './App';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import 'aos/dist/aos.css'; 

import "@fortawesome/fontawesome-free/css/all.min.css";

import ReduxThunk from 'redux-thunk';

import {Provider} from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import rootReducer from "./redux/reducer";
const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

ReactDOM.render(
  <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

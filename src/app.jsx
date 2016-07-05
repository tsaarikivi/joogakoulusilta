import React from "react"
import ReactDOM from "react-dom"
import { Router, hashHistory } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import reducer from "./dev/reducers/combinedReducer.js"
import routes from "./routes.jsx"
require('./styles/app.scss');

var store = createStore(reducer, applyMiddleware(thunk));

//================================================================
//Initialize firebase as a globally accessible property
//=============
global.firebase = require('firebase')
var firebaseConfig = {
  apiKey: "AIzaSyCq544Yq7EEY-5spIe1oFCe8gkOzRkS5ak",
  authDomain: "joogakoulusilta-projekti.firebaseapp.com",
  databaseURL: "https://joogakoulusilta-projekti.firebaseio.com",
  storageBucket: "joogakoulusilta-projekti.appspot.com",
};
firebase.initializeApp(firebaseConfig);
//================================================================

const app = document.getElementById('app');
ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory} routes={routes} />
  </Provider>,
  app
);

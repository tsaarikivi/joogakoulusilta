import React from "react"
import ReactDOM from "react-dom"
import { Router, Route, IndexRoute, hashHistory } from "react-router"
import firebase from "firebase"
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

// Reducers imports
import { combineReducers } from 'redux'
import { shopItems } from './dev/reducers/shopReducer.js'
//--
// Views
import Home from "./dev/views/Home.jsx"
import Info from "./dev/views/Info.jsx"
import Layout from "./dev/views/Layout.jsx"
import Login from "./dev/views/Login.jsx"
import Register from "./dev/views/Register.jsx"
import Shop from "./dev/views/Shop.jsx"
import User from "./dev/views/User.jsx"
import Checkout from "./dev/views/Checkout.jsx"



// Styles
require('./styles/app.scss');

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCq544Yq7EEY-5spIe1oFCe8gkOzRkS5ak",
  authDomain: "joogakoulusilta-projekti.firebaseapp.com",
  databaseURL: "https://joogakoulusilta-projekti.firebaseio.com",
  storageBucket: "joogakoulusilta-projekti.appspot.com",
};
firebase.initializeApp(config);

//Add here the reducers
const combineReducer = combineReducers({
  shopItems
});
var store = createStore(combineReducer, applyMiddleware(thunk));

const app = document.getElementById('app');

ReactDOM.render(

  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Home}></IndexRoute>
        <Route path="info" component={Info}></Route>
        <Route path="shop" component={Shop} store={store} firebase={firebase}></Route>
        <Route path="user" component={User} auth={firebase.auth()}></Route>
        <Route path="login" component={Login} auth={firebase.auth()}></Route>
        <Route path="register" component={Register} firebase={firebase}> </Route>
        <Route path="checkout" component={Checkout} firebase={firebase}> </Route>
      </Route>
    </Router>
  </Provider>,
  app
);

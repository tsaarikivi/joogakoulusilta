import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import firebase from "firebase";

require('./styles/app.scss');

import Home from "./dev/views/Home.jsx"
import Info from "./dev/views/Info.jsx"
import Layout from "./dev/views/Layout.jsx"
import Login from "./dev/views/Login.jsx"
import Register from "./dev/views/Register.jsx"
import Shop from "./dev/views/Shop.jsx"
import User from "./dev/views/User.jsx"
import Checkout from "./dev/views/Checkout.jsx"


// Initialize Firebase
var config = {
  apiKey: "AIzaSyCq544Yq7EEY-5spIe1oFCe8gkOzRkS5ak",
    authDomain: "joogakoulusilta-projekti.firebaseapp.com",
    databaseURL: "https://joogakoulusilta-projekti.firebaseio.com",
    storageBucket: "joogakoulusilta-projekti.appspot.com",
    braintree: {
        merchantId: "3gv7c5tq5q7hxrcs",
        publicKey: "gksd667wsgn35wjp",
        privateKey: "2c01703b7daffd7352eeaada7a4a95e5",
    },

};
firebase.initializeApp(config);

const app = document.getElementById('app');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home}></IndexRoute>
      <Route path="info" component={Info}></Route>
      <Route path="shop" component={Shop}></Route>
      <Route path="user" component={User}></Route>
      <Route path="login" component={Login}></Route>
      <Route path="register" component={Register}></Route>
      <Route path="checkout" component={Checkout}></Route>
    </Route>
  </Router>,
app);

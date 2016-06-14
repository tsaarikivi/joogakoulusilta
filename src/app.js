import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import firebase from "firebase";

require('./styles/app.scss');

import Layout from "./dev/views/Layout.jsx";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCambUGIYI2HeiwG6ril_5dEVEC8Av6oGI",
  authDomain: "testproject-b9597.firebaseapp.com",
  databaseURL: "https://testproject-b9597.firebaseio.com",
  storageBucket: "testproject-b9597.appspot.com",
};
firebase.initializeApp(config);

firebase.database().ref('items/').push({
  name: "tero",
  size: 11
})

const app = document.getElementById('app');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
    </Route>
  </Router>,
app);

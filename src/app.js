import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import firebase from "firebase";

require('./styles/app.scss');

import Layout from "./dev/views/Layout.jsx";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCq544Yq7EEY-5spIe1oFCe8gkOzRkS5ak",
    authDomain: "joogakoulusilta-projekti.firebaseapp.com",
    databaseURL: "https://joogakoulusilta-projekti.firebaseio.com",
    storageBucket: "joogakoulusilta-projekti.appspot.com",
};
firebase.initializeApp(config);

/*
firebase works this way:
firebase.database().ref('items/').push({
  name: "tero",
  size: 11
})*/

const app = document.getElementById('app');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
    </Route>
  </Router>,
app);

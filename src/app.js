import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

require('./styles/app.scss');

import Layout from "./dev/views/Layout.jsx";

const app = document.getElementById('app');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
    </Route>
  </Router>,
app);

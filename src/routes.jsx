import React from 'react'
import { Route, IndexRoute  } from "react-router"

// Views
import Home from "./dev/views/Home.jsx"
import Info from "./dev/views/Info.jsx"
import Layout from "./dev/views/Layout.jsx"
import Login from "./dev/views/Login.jsx"
import Register from "./dev/views/Register.jsx"
import Shop from "./dev/views/Shop.jsx"
import User from "./dev/views/User.jsx"
import Checkout from "./dev/views/Checkout.jsx"

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={Home}></IndexRoute>
    <Route path="info" component={Info}></Route>
    <Route path="shop" component={Shop}></Route>
    <Route path="user" component={User}></Route>
    <Route path="login" component={Login}></Route>
    <Route path="register" component={Register}> </Route>
    <Route path="checkout" component={Checkout}> </Route>
  </Route>
)

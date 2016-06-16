import React from "react";
import { Link } from "react-router"

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <div class="container main-header-container">
          <h1 class="main-heading">Joogakoulu Silta</h1>
          <p class="slogan">Silta joogan maailmaan</p>
          <Link className="text-link" to="info">Tutustu tarkemmin</Link>
        </div>
        <div class="container login-container">
          <h2 class="login-heading">Oletko jo jäsen?</h2>
          <Link className="btn-small login-btn" to="user">Kirjaudu</Link>
          <Link className="btn-small register-btn" to="user">Tai rekisteröidy</Link>
        </div>
        <div class="container contact-container">
            <h2 class="contact-heading">Yhteystiedot</h2>
            <p class="contact-info">Joogakoulu Silta / Tuula Heiskanen</p>
            <p class="contact-info">Tallbergin puistotie 7A, 00200 Helsinki</p>
            <p class="contact-info">joogakoulusilta@gmail.com</p>
            <p class="contact-info">050 373 8656</p>
        </div>
      </div>
    );
  }
}

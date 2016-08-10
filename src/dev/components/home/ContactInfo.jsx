import React from "react";

export default class ContactInfo extends React.Component {
  render() {
    return (
      <div class="container contact-container">
        <div className="content-container align-left">
          <h2 class="contact-heading">Yhteystiedot</h2>
          <p class="contact-info">Joogakoulu Silta / Tuula Heiskanen</p>
          <p class="contact-info">Tallbergin puistotie 7A, 00200 Helsinki</p>
          <p class="contact-info">joogakoulusilta@gmail.com</p>
          <p class="contact-info">050 373 8656</p>
          <div class="mobile-centered">
            <a alt="facebook" className="social-btn" href="https://www.facebook.com/joogakoulusilta/" target="_blank"><img src="./assets/facebook.png" /></a>
            <a alt="instagram" className="social-btn" href="https://www.instagram.com/joogakoulusilta/" target="_blank"><img src="./assets/instagram.png" /></a>
          </div>
        </div>
      </div>
    );
  }
}

import React from "react";

export default class LockedUser extends React.Component {

  render() {
    return (
      <div>
       <h3 className="centered"> Käyttäjtunnuksesi on lukittu.</h3>
       <p className="centered">Ole yhteydessä jooga-opettajaasi sen jälleen avaamiseksi.</p>
      </div>
    );
  }
}


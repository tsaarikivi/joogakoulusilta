import React from "react";

import UserList from '../admin/UserList.jsx'

export default class CashPayment extends React.Component {

  render() {
    return(
      <div>
        <button className="btn-small btn-blue" onClick={() => this.props.actions.resetShop()} > Peru osto </button>
        <h3 className="centered"> Valitse käyttäjä, jolle osto suoritetaan.</h3>
        <UserList />
      </div>  
    )
  }
}

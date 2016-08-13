import React from "react";
import { Link } from "react-router"
import UserList from '../admin/UserList.jsx'

export default class LateBooking extends React.Component {

  render() {
    return(
      <div>
        <div className="content-container">
          <h3> Valitse käyttäjä, jolle varaus suoritetaan.</h3>
        </div>
        <UserList />
      </div>  
    )
  }
}

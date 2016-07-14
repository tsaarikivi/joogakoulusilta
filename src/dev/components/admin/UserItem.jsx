import React from 'react'

export default class UserItem extends React.Component {
  
  renderButtons() {

    //TODO: fix according !user.locked
    //TODO: add button functionality
    if (true) {
      return <button className="btn-small btn-red float-right">Lukitse</button>
    }
    else {
      return <button className="btn-small btn-green float-right">Aktivoi</button>
    }
  }
  
  render() {
    const {user} = this.props

    //TODO: Render functionality for admin

    return (
      <li className="text-list-item">
        <span className="float-left">{user.firstname} {user.lastname} {user.email}</span>
        {this.renderButtons()}
      </li>
    )
  }
}

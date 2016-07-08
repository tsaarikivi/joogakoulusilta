import React from 'react'

export default class UserItem extends React.Component {
  render() {
    const {user} = this.props

    //TODO: Render functionality for admin

    return (
      <li>
        <span>{user.firstname} {user.lastname} {user.email}</span>
      </li>
    )
  }
}

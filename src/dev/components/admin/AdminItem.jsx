import React from 'react'

export default class AdminItem extends React.Component {
  render() {
    const {admin} = this.props

    //TODO: Render functionality for admin

    return (
      <li>
        <span>{admin.firstname} {admin.lastname} {admin.email}</span>
      </li>
    )
  }
}

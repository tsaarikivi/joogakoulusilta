import React from 'react'

export default class AdminItem extends React.Component {
  
  render() {
    const {item} = this.props

    //TODO: Render functionality for admin

    return (
      <li className="text-list-item">
        <span className="float-left">{item.firstname} {item.lastname} {item.email}</span>
      </li>
    )
  }
}

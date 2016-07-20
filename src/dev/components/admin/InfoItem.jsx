import React from 'react'

export default class InfoItem extends React.Component {
  
  render() {
    const {item} = this.props

    //TODO: Render functionality for admin

    return (
      <li className="text-list-item">
        <span className="item-row">{item.title}</span>
        <span className="item-row">{item.content}</span>
      </li>
    )
  }
}

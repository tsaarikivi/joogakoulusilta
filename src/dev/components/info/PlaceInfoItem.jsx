import React from 'react'

export default class PlaceInfoItem extends React.Component {

  render() {
    return (
      <li>
        <h3 className="item-title">{this.props.item.name}</h3>
        <p className="item-address">{this.props.item.address}</p>
        <p className="item-desc">{this.props.item.desc}</p>
      </li>
    )
  }
}

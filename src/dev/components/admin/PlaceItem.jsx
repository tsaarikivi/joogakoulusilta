import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionCreators from '../../actions/admin.js'

export default class PlaceItem extends React.Component {
  render() {
    //TODO: Render functionality for admin

    return (
      <li className="text-list-item">
        <span className="item-row">{this.props.item.name}</span>
        <span className="item-row">{this.props.item.address}</span>
      </li>
    )
  }
}

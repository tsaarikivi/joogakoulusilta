import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionCreators from '../../actions/admin.js'

class ShopItem extends React.Component {
  
  renderButtons() {
    //TODO: fix according !user.locked
    //TODO: add button functionality
    if (this.props.item.locked) {
      return <button className="btn-small btn-green float-right" onClick={() => this.props.actions.unlockShopItem(this.props.item.key)}>Ota käyttöön</button>      
    }
    else {
      return <button className="btn-small btn-red float-right" onClick={() => this.props.actions.lockShopItem(this.props.item.key)}>Poista käytöstä</button>
    }
  }
  
  render() {
    //TODO: Render functionality for admin

    return (
      <li className="text-list-item">
        <span className="float-left">{this.props.item.title}</span>
        {this.renderButtons()}
      </li>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

export default connect(null, mapDispatchToProps)(ShopItem)

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as adminActionCreators from '../../actions/admin.js'
import * as shopActionCreators from '../../actions/shop.js'

class UserItem extends React.Component {

  renderButtons() {
    //TODO: fix according !user.locked
    //TODO: add button functionality

    if (this.props.item.locked) {
      return <button className="btn-small btn-green float-right" onClick={() => this.props.adminActions.unlockUser(this.props.item.uid)}>Aktivoi</button>
    }
    if(this.props.shopItems.phase === "cashPayment"){
      return <button className="btn-small btn-green float-right" onClick={() => this.props.shopActions.executeCashPurchase(this.props.item.uid, this.props.shopItems.cart.key)}>Osto</button>

    }
      return (
        <div>
          <button className="btn-small btn-red float-right" onClick={() => this.props.adminActions.lockUser(this.props.item.uid)}>Lukitse</button>
          <button className="btn-small btn-blue float-right" onClick={() => this.props.adminActions.makeInstructor(this.props.item.uid)}>Joogaopettajaksi</button>
        </div>
      )
  }

  render() {
    const {item} = this.props

    //TODO: Render functionality for admin

    return (
      <li className="text-list-item">
        <span className="float-left">{item.firstname} {item.lastname} {item.email}</span>
        {this.renderButtons()}
      </li>
    )
  }
}

function mapStateToProps(state) {
  return { shopItems: state.shopItems }
}

function mapDispatchToProps(dispatch) {
  return {
    adminActions: bindActionCreators(adminActionCreators, dispatch),
    shopActions: bindActionCreators(shopActionCreators,dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserItem)

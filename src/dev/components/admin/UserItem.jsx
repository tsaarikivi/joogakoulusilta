import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionCreators from '../../actions/admin.js'

class UserItem extends React.Component {
  
  renderButtons() {
    //TODO: fix according !user.locked
    //TODO: add button functionality

    if (this.props.item.locked) {
      return (
        <span className="item-row">
          <button className="btn-small btn-green float-right" onClick={() => this.props.actions.unlockUser(this.props.item.uid)}>Aktivoi</button>
        </span>
      )
    }
    else {      
      return (
        <div>
          <span className="item-row">
            <button className="btn-small btn-red" onClick={() => this.props.actions.lockUser(this.props.item.uid)}>Lukitse</button>
          </span>
          <span className="item-row">
            <button className="btn-small btn-blue" onClick={() => this.props.actions.makeInstructor(this.props.item.uid)}>Joogaopettajaksi</button>
          </span>
        </div>        
      )
    }
  }
  
  render() {
    const {item} = this.props

    //TODO: Render functionality for admin

    return (
      <li className="text-list-item">
        <span className="item-row">{item.firstname} {item.lastname}</span>
        <span className="item-row">{item.email}</span>
        {this.renderButtons()}
      </li>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

export default connect(null, mapDispatchToProps)(UserItem)
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionCreators from '../../actions/admin.js'

class UserItem extends React.Component {
  
  renderButtons() {
    //TODO: fix according !user.locked
    //TODO: add button functionality

    if (this.props.item.locked) {
      return <button className="btn-small btn-green float-right" onClick={() => this.props.actions.unlockUser(this.props.item.uid)}>Aktivoi</button>
    }
    else {      
      return (
        <div>
          <button className="btn-small btn-red float-right" onClick={() => this.props.actions.lockUser(this.props.item.uid)}>Lukitse</button>
          <button className="btn-small btn-blue float-right" onClick={() => this.props.actions.makeInstructor(this.props.item.uid)}>Joogaopettajaksi</button>
        </div>        
      )
    }
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

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

export default connect(null, mapDispatchToProps)(UserItem)
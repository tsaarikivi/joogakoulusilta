import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionCreators from '../../actions/admin.js'

class InstructorItem extends React.Component {
  renderButtons() {

    //TODO: Add proper buttons and functionality
    return(
      <span className="item-row">
        <button className="btn-small btn-red" onClick={() => this.props.actions.unmakeInstructor(this.props.item.uid)}>Poista Joogaopettaja</button> 
      </span>
    )
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

export default connect(null, mapDispatchToProps)(InstructorItem)

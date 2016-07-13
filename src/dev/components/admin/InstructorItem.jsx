import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionCreators from '../../actions/admin.js'

class InstructorItem extends React.Component {
  renderButtons() {

    //TODO: Add proper buttons and functionality
    return(
      <button className="btn-small btn-red float-right" onClick={() => this.props.actions.unmakeInstructor(this.props.item.uid)}>Poista Joogaopettaja</button>
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

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

export default connect(null, mapDispatchToProps)(InstructorItem)

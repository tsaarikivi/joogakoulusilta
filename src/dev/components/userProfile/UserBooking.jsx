import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actionCreators from '../../actions/user.js'

class UserBooking extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }


  render() {
    return (
      <div className="container bordered-container">
        <div className="content-container">
          <p>{this.props.item.courseName}</p>
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return { auth: state.auth }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserBooking)

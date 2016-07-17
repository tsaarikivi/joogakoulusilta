import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actionCreators from '../../actions/user.js'

import {getDayStrMs, getTimeStrMs} from '../../helpers/timeHelper.js'

class UserBooking extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }


  render() {

    return (
        <div className="booking-container">
          <p>{this.props.item.courseName} {getDayStrMs(this.props.item.courseTime)} {getTimeStrMs(this.props.item.courseTime)}</p>
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

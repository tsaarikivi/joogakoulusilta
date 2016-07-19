import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {postCancellation} from '../../actions/bookings.js'


import {getDayStrMs, getTimeStrMs} from '../../helpers/timeHelper.js'

class UserBooking extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  cancelReservation(item){
    console.log("Cancelling: ", item);
    this.props.actions.postCancellation(item.courseTime, item.transactionReference, item.courseInfo);
  }

  render() {
    let day = new Date()
    var cancelButton = null;
    //Show cancel button if course starts more than 5 hours from now.
    if(this.props.item.courseTime > day.getTime()+5*60*60*1000){
      cancelButton = <button className="btn-small btn-blue btn-right" onClick={() => this.cancelReservation(this.props.item)} >Peru </button>
    } else {
      cancelButton = <p className="btn-small btn-blue btn-right">Ei voi enää perua.</p>      
    }

    return (
        <li className="booking-container">
          <span className="item-row">
            <p className="header-collapse onerow-item">{this.props.item.courseName} {getDayStrMs(this.props.item.courseTime)} {getTimeStrMs(this.props.item.courseTime)}</p>
            {cancelButton}
          </span>
        </li>
    )
  }
}


function mapStateToProps(state) {
  return { auth: state.auth }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({postCancellation}, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserBooking)

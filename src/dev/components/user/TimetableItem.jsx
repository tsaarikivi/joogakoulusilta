import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { putCourseInfo } from '../../actions/courses.js'
import * as bookingsActionCreators from '../../actions/bookings.js'

class TimeTableItem extends React.Component {

  constructor(){
    super();
    this.startDate = new Date();
    this.endDate = new Date();
  }

  getDisplayTime(date,time){
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    date.setTime(date.getTime()+time)
  }

  componentWillReceiveProps(nextProps){
    //console.log("T-ITEM:", nextProps);
    this.getDisplayTime(this.startDate, nextProps.item.start);
    this.getDisplayTime(this.endDate, nextProps.item.end);
  }

  componentWillMount(){
    this.getDisplayTime(this.startDate, this.props.item.start);
    this.getDisplayTime(this.endDate, this.props.item.end);
    this.props.bookingsActions.fetchCourseBookings(this.props.item.key, this.props.currentUser.uid)
  }

  componentWillUnmount(){
    this.props.bookingsActions.stopfetchCourseBookings(this.props.item.key)
  }

  itemClicked() {
    this.props.courseActions.putCourseInfo(this.props.item, this.props.booking)
  }

  render() {
    var userBooked = null;
    if(this.props.booking){
      if(this.props.booking.user.length > 0){
        if(this.props.booking.user.length > 1){
          userBooked = <p className="table-participants">VARATTU + VARATTU</p>
        } else {
          userBooked = <p className="table-participants">VARATTU</p>
        }
      }
    }
    if(this.props.booking){
      var allBooked = <p className="table-participants">0/{this.props.item.maxCapacity}</p>
      if(this.props.booking.all.length > 0){
        if(this.props.booking.all.length > 1){
          allBooked = <p className="table-participants">{this.props.booking.all[0].reservations}/{this.props.item.maxCapacity} {this.props.booking.all[1].reservations}/{this.props.item.maxCapacity}</p>
        } else {
          allBooked = <p className="table-participants">{this.props.booking.all[0].reservations}/{this.props.item.maxCapacity}</p>
        }
      }
    }
    return (
      <td onClick={() => this.itemClicked()}>
        <p className="table-course">{this.props.item.courseType.name}</p>
        <p className="table-time">{this.startDate.toTimeString().slice(0,5)} - {this.endDate.toTimeString().slice(0,5)}</p>
        <img className="mini-icon" src="./assets/group.png" />
        {allBooked}
        {userBooked}
      </td>
    );
  }
}

function mapStateToProps(state) {
  return {  courseInfo: state.courseInfo, currentUser: state.currentUser }
}

function mapDispatchToProps(dispatch) {
  return { courseActions: bindActionCreators({putCourseInfo}, dispatch),
           bookingsActions: bindActionCreators(bookingsActionCreators, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeTableItem)

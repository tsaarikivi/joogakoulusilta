import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getCourseTimeGMT, hasDayPassed } from '../../helpers/timeHelper.js'

import {removeCourseInfo} from '../../actions/courses.js'
import * as bookingsActionCreators from '../../actions/bookings.js'

class CourseInfo extends React.Component {

  constructor(){
    super();
    this.fetchStarted = false;
    this.bookings = [];
  }

  processBookings(inputBookings){
    let instanceId;
    let instanceObj;
    let booking = {}
    let user;
    let index = 0;
    for (instanceId in inputBookings){
      //Booking is in the future - it counts!!
      if(instanceId > Date.now()){
        booking.instance = instanceId;
        booking.reservations = 0;
        booking.participants = [];
        instanceObj = inputBookings[instanceId];
        for(user in instanceObj){
          booking.reservations++;
          booking.participants.push(instanceObj[user].user);
        }
        this.bookings.push(Object.assign({},booking))
        index++;
      }
    }
    this.bookings.sort((a,b) => {return a.instance - b.instance})
    console.log("PROCESSED BOOKINGS: ", this.bookings);
  }

  componentWillReceiveProps(nextProps){
    console.log("COURSEITEM.NEXTPROPS:", nextProps);
    //Fetching is started only when CourseInfo is pushed to this component.
    // Do it only once to avoid recursion. Therefore set flag fetchStarted.
    if(nextProps.courseInfo && !this.fetchStarted){
      this.fetchStarted = true;
      this.props.bookingsActions.fetchBookings(nextProps.courseInfo.key)
    }
    this.bookings = [];
    //If boooking information is present, find relevant details for display
    if(nextProps.bookings){
      console.log("BOOKINGS PRESENT.", nextProps.bookings, typeof(nextProps.bookings));
      this.processBookings(nextProps.bookings);
    }
  }

  makeReservation(forward) {
    this.props.bookingsActions.postReservation(forward, this.props.courseInfo)
  }

  cancelReservation(item, txRef) {
    this.props.bookingsActions.postCancellation(item, txRef, this.props.courseInfo)
  }

  exitContainer() {
    this.props.courseActions.removeCourseInfo()
    this.props.bookingsActions.stopFetchBookings()
    this.fetchStarted = false;
  }

  usersReservations(){
    console.log("USERSRESERVATIONS:", this.props.currentUser.bookings);
    let outStr = "";
    let item = 0;
    let txRef = 0;
    let time = new Date();
    if(this.props.currentUser.bookings){
      let one;
      let all = this.props.currentUser.bookings
      for (one in all){
        if(this.props.courseInfo.key === all[one].course)
        time.setTime(one);
        outStr += time.toString() + " | "
        item = one;
        txRef = all[one].transactionReference;
      }
    }
    if(outStr === ""){
        return(<p>Sinulla ei ole varauksia tälle kurssille.</p>);
    } else {
      return(
        <button className="btn-small btn-blue" onClick={() => this.cancelReservation(item, txRef)} >Peru: {outStr} </button>
      );
    }
  }

  participants(bookingIndex){
    let adjustedIndex;
    if (hasDayPassed(this.props.courseInfo.day)){
      if(bookingIndex == 0) return(<div></div>)
      else adjustedIndex = bookingIndex - 1;
    } else {
      adjustedIndex = bookingIndex;
    }
    if(this.bookings.length > adjustedIndex){
      let participantlist = "";
      let date = new Date();
      date.setTime(this.bookings[adjustedIndex].instance);
      this.bookings[adjustedIndex].participants.forEach((item,index) => { participantlist += " " + item })
      return(
        <div>
          <p>Ilmoittautuneita {this.bookings[adjustedIndex].reservations}/{this.props.courseInfo.maxCapacity}</p>
          <p>Osallistujat: {participantlist}</p>
        </div>
      );
    }
    else {
      return(
        <div>
          <p>Ei ilmoittautuneita.</p>
        </div>
      )
    }
  }

  reservationButton(weekIndex){
    let dayStr = getCourseTimeGMT(weekIndex, this.props.courseInfo.start, this.props.courseInfo.day).toString();
    let milliseconds = getCourseTimeGMT(weekIndex, this.props.courseInfo.start, this.props.courseInfo.day).getTime()
    if(weekIndex == 0){
      if (hasDayPassed(this.props.courseInfo.day)){
        return(
          <div>
            <p>Tämän viikon kurssi on jo pidetty.</p>
          </div>
        )
      }
    }
    if(this.props.currentUser.bookings){
      if(this.props.currentUser.bookings[milliseconds]){
        return(
          <p> Sinä olet ilmoittautunut tälle kurssille: {dayStr}</p>
        );
      }
    }
        return(
          <div>
            <button className="btn-small btn-blue" onClick={() => this.makeReservation(weekIndex)} >Ilmoittaudu
              { dayStr }
              { milliseconds }
            </button>
          </div>
        );
  }


  render() {
    if(this.props.courseInfo) {
      return (
        <div className="course-info-container">
          <div className="course-info">
            <button className="exit-btn" onClick={this.exitContainer.bind(this)}>x</button>
            <h3>{this.props.courseInfo.courseType.name}</h3>
            <p>{this.props.courseInfo.courseType.desc}</p>
            <hr/>
            <p>Klo {getCourseTimeGMT(0, this.props.courseInfo.start, this.props.courseInfo.day).toTimeString().slice(0,5)} - {getCourseTimeGMT(0, this.props.courseInfo.end, this.props.courseInfo.day).toTimeString().slice(0,5)}</p>
            <p>Sijainti {this.props.courseInfo.place.name}, {this.props.courseInfo.place.address}</p>
            <hr/>
            <p>Joogaopettaja {this.props.courseInfo.instructor.name}</p>
            <hr/>
              {this.reservationButton(0)}
              {this.participants(0)}
              {this.reservationButton(1)}
              {this.participants(1)}
              <br></br>
              {this.usersReservations()}
          </div>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {  courseInfo: state.courseInfo,
            currentUser: state.currentUser,
            bookings: state.bookings }
}

function mapDispatchToProps(dispatch) {
  return { courseActions: bindActionCreators({removeCourseInfo}, dispatch),
           bookingsActions: bindActionCreators(bookingsActionCreators, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseInfo)

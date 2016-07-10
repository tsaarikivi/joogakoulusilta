import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import axios from 'axios'

import {removeCourseInfo} from '../../actions/courses.js'
import * as bookingsActionCreators from '../../actions/bookings.js'

class CourseInfo extends React.Component {

  constructor(){
    super();
    this.fetchStarted = false;
    this.thisWeekReservations = 0;
    this.nextWeekReservations = 0;
    this.thisWeekParticipants = "";
    this.nextWeekParticipants = "";
  }

  componentWillReceiveProps(nextProps){
    console.log("COURSEITEM.NEXTPROPS:", nextProps);
    //Fetching is started only when CourseInfo is pushed to this component.
    // Do it only once to avoid recursion. Therefore set flag fetchStarted.
    if(nextProps.courseInfo && !this.fetchStarted){
      this.fetchStarted = true;
      this.props.bookingsActions.fetchBookings(nextProps.courseInfo.key)
    }
    //If boooking information is present, find relevant details for display
    if(nextProps.bookings){
      var instanceId;
      var user;
      this.thisWeekReservations = 0;
      this.nextWeekReservations = 0;
      this.thisWeekParticipants = "";
      this.nextWeekParticipants = "";
      for (instanceId in nextProps.bookings){
        //Booking is in the future - it counts!!
        if(instanceId > Date.now()){
          var instanceObj = nextProps.bookings[instanceId];
          //Booking is for next week
          if(instanceId > Date.now()+ 7*24*60*60*1000){
            for(user in instanceObj){
              this.nextWeekReservations++;
              this.nextWeekParticipants += " " + instanceObj[user].user;
            }
          }
          else {
            for(user in instanceObj){
              this.thisWeekReservations++
              this.thisWeekParticipants += " " + instanceObj[user].user;
            }
          }
        }
      }
    }
  }

  makeReservation(forward) {
    var JOOGAURL = typeof(JOOGASERVER) === "undefined" ? 'http://localhost:3000/reserveSlot' : JOOGASERVER+'/reserveSlot'
    console.log("JOOGASERVER: ", JOOGASERVER);
    console.log("JOOGAURL: ", JOOGAURL);
    var that = this;
    firebase.auth().currentUser.getToken(true).then( idToken => {
      axios.post(
        JOOGAURL, {
          user: idToken,
          courseInfo: that.props.courseInfo,
          weeksForward: forward
        })
        .then( response => {
          console.log(response.data);
        })
        .catch( error => {
          console.error(error);
        });
      }).catch( error => {
        console.error("Failde to get authentication token for current user: ", error);
      });
  }

  exitContainer() {
    this.props.courseActions.removeCourseInfo()
    this.props.bookingsActions.stopFetchBookings()
    this.fetchStarted = false;
  }

  render() {
    if(this.props.courseInfo) {
      return (
        <div className="course-info-container">
          <div className="course-info">
            <button className="exit-btn" onClick={this.exitContainer.bind(this)}>x</button>
            <div className="info-info-container">
              <h3>{this.props.courseInfo.courseType.name}</h3>
              <p className="info-time">Klo {this.props.courseInfo.start} - {this.props.courseInfo.end}</p>
              <p className="info-place">Sijainti: {this.props.courseInfo.place.name}, {this.props.courseInfo.place.address}</p>
              <p className="info-instructor">Joogaopettaja: {this.props.courseInfo.instructor.name}</p>
              <p className="info-desc">{this.props.courseInfo.courseType.desc}</p>
            </div>
            <span className="week-info-container">
              <button className="btn-small btn-blue" onClick={() => this.makeReservation(0)} >Ilmoittaudu tälle viikolle</button>
              <p className="info-reserved">Ilmoittautuneita tälle viikolle {this.thisWeekReservations}/{this.props.courseInfo.maxCapacity}</p>
              <p className="info-participants">Osallistujat: {this.thisWeekParticipants}</p>
            </span>
            <span className="week-info-container">
              <button className="btn-small btn-white" onClick={() => this.makeReservation(1)} >Ilmoittaudu seuraavalle viikolle</button>
              <p className="info-reserved">Ilmoittautuneita ensi viikolle {this.nextWeekReservations}/{this.props.courseInfo.maxCapacity}</p>
              <p className="info-participants">Osallistujat: {this.nextWeekParticipants}</p>
            </span>
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

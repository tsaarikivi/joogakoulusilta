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
            <h3>{this.props.courseInfo.courseType.name}</h3>
            <p>{this.props.courseInfo.courseType.desc}</p>
            <hr/>
            <p>Klo {this.props.courseInfo.start} - {this.props.courseInfo.end}</p>
            <p>Sijainti {this.props.courseInfo.place.name}, {this.props.courseInfo.place.address}</p>
            <hr/>
            <p>Joogaopettaja {this.props.courseInfo.instructor.name}</p>
            <hr/>
            <p>Ilmoittautuneita tälle viikolle {this.thisWeekReservations}/{this.props.courseInfo.maxCapacity}</p>
            <p>Osallistujat: {this.thisWeekParticipants}</p>
              <button className="btn-small btn-blue" onClick={() => this.makeReservation(0)} >Ilmoittaudu tälle viikolle</button>
            <br></br>
            <p>Ilmoittautuneita ensi viikolle {this.nextWeekReservations}/{this.props.courseInfo.maxCapacity}</p>
            <p>Osallistujat: {this.nextWeekParticipants}</p>
            <button className="btn-small register-btn btn-blue" onClick={() => this.makeReservation(1)} >Ilmoittaudu seuraavalle viikolle</button>
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

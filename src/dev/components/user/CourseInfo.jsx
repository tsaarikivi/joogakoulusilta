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
  }

  componentWillMount(){
  }

  componentWillUnMount(){
  }

  componentWillReceiveProps(nextProps){
    //Fetching is started only when CourseInfo is pushed to this component.
    // Do it only once to avoid recursion. Therefore set flag fetchStarted.
    if(nextProps.courseInfo && !this.fetchStarted){
      this.fetchStarted = true;
      this.props.bookingsActions.fetchCourseBookings(nextProps.courseInfo.key, this.props.currentUser.uid)
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
    this.props.bookingsActions.stopfetchCourseBookings()
    this.fetchStarted = false;
  }

  userCanBook(){
    return (this.props.currentUser.transactions.count > 0 || this.props.currentUser.transactions.time > Date.now()) ? true : false;
  }
  //========================================================================
  //========================================================================
  //========================================================================
  usersReservations(){
    let outStr = "";
    let item = 0;
    let txRef = 0;
    let time = new Date();
    if(this.props.courseInfo.userbookings.length > 0){
        item = this.props.courseInfo.userbookings[0].item;
        time.setTime(item);
        outStr += time.toString() + " | " + item;
        txRef = this.props.courseInfo.userbookings[0].txRef;
    }
    if(outStr === ""){
        return(<p className="info-noreservations">Et ole ilmoittautunut tälle kurssille.</p>);
    } else {
      return(
        <button className="btn-small btn-blue" onClick={() => this.cancelReservation(item, txRef)} >Peru: {outStr} </button>
      );
    }
  }

  //========================================================================
  //========================================================================
  //========================================================================
  participants(bookingIndex){
    let adjustedIndex;
    //=======================================
    if (hasDayPassed(this.props.courseInfo.day)){
      if(bookingIndex == 0){
        return(<div></div>); //Not listing past participants.
      }
      else {
        adjustedIndex = bookingIndex - 1;
      }
    } else {
      adjustedIndex = bookingIndex;
    }
    //========================================
    if(this.props.courseInfo.bookings.length > adjustedIndex){
      let participantlist = "";
      let date = new Date();
      date.setTime(this.props.courseInfo.bookings[adjustedIndex].instance);
      this.props.courseInfo.bookings[adjustedIndex].participants.forEach((item,index) => { participantlist += " " + item })
      return(
        <div>
          <p className="info-reserved">Ilmoittautuneita {this.props.courseInfo.bookings[adjustedIndex].reservations}/{this.props.courseInfo.maxCapacity}</p>
          <p className="info-participants">Osallistujat: {participantlist}</p>
        </div>
      );
    }
    else {
      return(
        <div>
          <p className="info-reserved">Ei ilmoittautuneita.</p>
        </div>
      )
    }
  }

  //========================================================================
  //========================================================================
  //========================================================================
  reservationButton(weekIndex){
    let dayStr = getCourseTimeGMT(weekIndex, this.props.courseInfo.start, this.props.courseInfo.day).toString();
    let milliseconds = getCourseTimeGMT(weekIndex, this.props.courseInfo.start, this.props.courseInfo.day).getTime()
    if(weekIndex == 0){
      if (hasDayPassed(this.props.courseInfo.day)){
        return(
          <div>
            <p className="info-keptweek">Tämän viikon kurssi on jo pidetty.</p>
          </div>
        )
      }
    } else {
      if (!hasDayPassed(this.props.courseInfo.day)){
        return(
          <div>
            <p className="info-keptweek">Ensi viikon kurssia ei voi vielä varata.</p>
          </div>
        )
      }
    }
    if(!this.userCanBook()){
      return(<div>
              <p className="info-cantreserve">Sinulla ei ole oikeutta varata. Mene kauppaan</p>
            </div>
    );
    }
    if(this.props.courseInfo.userbookings.length > 0){
        //TODO: tarkista että onko juuri tälle viikolle ilmoitauduttu
            return(
              <p> Sinä olet ilmoittautunut tälle kurssille: {dayStr}</p>
            );
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
            <div className="info-info-container">
              <h3>{this.props.courseInfo.courseType.name}</h3>
              <p className="info-time">Klo {getCourseTimeGMT(0, this.props.courseInfo.start, this.props.courseInfo.day).toTimeString().slice(0,5)} - {getCourseTimeGMT(0, this.props.courseInfo.end, this.props.courseInfo.day).toTimeString().slice(0,5)}</p>
              <p className="info-place">Sijainti: {this.props.courseInfo.place.name}, {this.props.courseInfo.place.address}</p>
              <p className="info-instructor">Joogaopettaja: {this.props.courseInfo.instructor.name}</p>
              <p className="info-desc">{this.props.courseInfo.courseType.desc}</p>
              {this.usersReservations()}
            </div>
            <span className="week-info-container">
              {this.reservationButton(0)}
              {this.participants(0)}
            </span>
            <span className="week-info-container">
              {this.reservationButton(1)}
              {this.participants(1)}
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
  return {  courseInfo: state.courseInfo, currentUser: state.currentUser }
}

function mapDispatchToProps(dispatch) {
  return { courseActions: bindActionCreators({removeCourseInfo}, dispatch),
           bookingsActions: bindActionCreators(bookingsActionCreators, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseInfo)

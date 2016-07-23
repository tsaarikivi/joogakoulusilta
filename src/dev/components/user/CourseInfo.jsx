import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getCourseTimeGMT, hasDayPassed, timeToMoment, getDayStrMs, getTimeStrMs, getDayStr, getTimeStr } from '../../helpers/timeHelper.js'
import {removeCourseInfo} from '../../actions/courses.js'
import * as bookingsActionCreators from '../../actions/bookings.js'

class CourseInfo extends React.Component {

  constructor(){
    super();
    this.fetchStarted = false;
    this.reservationRequestOngoing = [false, false];
  }

  componentWillReceiveProps(nextProps){
  }


  makeReservation(forward) {
    if(!this.reservationRequestOngoing[forward]){
      this.reservationRequestOngoing [forward] = true;
      this.props.bookingsActions.postReservation(forward, this.props.courseInfo)
    }
  }

  exitContainer() {
    this.props.courseActions.removeCourseInfo()
    this.reservationRequestOngoing = [false,false];
  }

  userCanBook(){
    return (this.props.currentUser.transactions.count > 0 || this.props.currentUser.transactions.time > Date.now()) ? true : false;
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
      if(this.props.courseInfo.bookings.all.length > adjustedIndex){
        return(
          <div>
            <p className="info-reserved">Ilmoittautuneita {this.props.courseInfo.bookings.all[adjustedIndex].reservations}/{this.props.courseInfo.maxCapacity}</p>
          </div>
        );
      }
      else {
        return(
          <div>
            <p className="info-reserved">Ilmoittautuneita 0/{this.props.courseInfo.maxCapacity}</p>
          </div>
        )
      }
  }

  //========================================================================
  //========================================================================
  //========================================================================
  reservationButton(weekIndex){
    let day = getCourseTimeGMT(weekIndex, this.props.courseInfo.start, this.props.courseInfo.day)
    let dayStr = getDayStr(day) + " " + getTimeStr(day)
    let millisecondsStart = getCourseTimeGMT(weekIndex, this.props.courseInfo.start, this.props.courseInfo.day).getTime()
    let millisecondsEnd = getCourseTimeGMT(weekIndex, this.props.courseInfo.end, this.props.courseInfo.day).getTime()
    if(weekIndex == 0){
      if (hasDayPassed(this.props.courseInfo.day)){
        return(
          <div>
            <p className="info-keptweek">Tämän viikon kurssi on jo pidetty.</p>
          </div>
        )
      }
    } else {
      if (!hasDayPassed(this.props.courseInfo.day) && timeToMoment(millisecondsStart) < 1*60*60*1000){
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
    if(this.props.courseInfo.bookings){
      if(this.props.courseInfo.bookings.user.length > 0){
          if(weekIndex === 0 && this.props.courseInfo.bookings.user[0].item < Date.now() + 7*24*60*60*1000 ){
              return(
                <p> Sinä olet ilmoittautunut tälle kurssille: {dayStr}</p>
              );
          }
          if(weekIndex === 1 &&  hasDayPassed(this.props.courseInfo.day)){
              return(
                <p> Sinä olet ilmoittautunut tälle kurssille: {dayStr}</p>
              );
          }
      }
      if(this.props.courseInfo.bookings.user.length > 1){
          if(weekIndex === 1 && this.props.courseInfo.bookings.user[1].item > Date.now() + 7*24*60*60*1000 ){
              return(
                <p> Sinä olet ilmoittautunut tälle kurssille: {dayStr}</p>
              );
          }
      }
    }
    if (weekIndex === 0){
      if(timeToMoment(millisecondsEnd) < 0){
        return(
          <p> Tämän viikon kurssin on jo pidetty</p>
        );
      }
      if(timeToMoment(millisecondsStart) < 0 && millisecondsEnd > 0){
        return(
          <p> Kurssi on jo käynnissä </p>
        );
      }
      if(timeToMoment(millisecondsStart) < 1*60*60*1000){
        return(
          <p> Kurssin alkuun aikaa alle tunti. Varauksia ei voi tehdä. Kurssi alkaa: {dayStr}</p>
        );
      }
    }

      return(
            <div>
              <button className="btn-small btn-blue" onClick={() => this.makeReservation(weekIndex)} >
                { dayStr }
              </button>
            </div>
          );
  }


  render() {
    if(this.props.courseInfo.key !== "0"){
      return (
        <div className="course-info-container">
          <div className="course-info">
            <button className="exit-btn" onClick={this.exitContainer.bind(this)}>x</button>
            <div className="info-info-container">
              <h3>{this.props.courseInfo.courseType.name}</h3>
              <p className="info-time">Klo {getCourseTimeGMT(0, this.props.courseInfo.start, this.props.courseInfo.day).toTimeString().slice(0,5)} - {getCourseTimeGMT(0, this.props.courseInfo.end, this.props.courseInfo.day).toTimeString().slice(0,5)}</p>
              <p className="info-place">Sijainti: {this.props.courseInfo.place.name}, {this.props.courseInfo.place.address}</p>
              <p className="info-instructor">Joogaopettaja: {this.props.courseInfo.instructor.firstname} {this.props.courseInfo.instructor.lastname}</p>
              <p className="info-desc">{this.props.courseInfo.courseType.desc}</p>
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
      return ( <div></div>)
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

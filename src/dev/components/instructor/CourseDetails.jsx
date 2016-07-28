import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getCourseTimeLocal, sameDay, hasDayPassed, hasTimePassed, timeToMoment, getDayStrMs, getTimeStrMs, getDayStr, getTimeStr } from '../../helpers/timeHelper.js'
import UserItem from './UserItem.jsx'
import * as instructoractions from '../../actions/instructor.js'

class CourseDetails extends React.Component {

  componentWillReceiveProps(nextProps){
    console.log("COURSEDETAILS:", nextProps);
  }

  exitContainer() {
    this.props.actions.clearInstructorData()
  }

  renderuser(item) {
      console.log("what about WE HERE?");
      return (
        <UserItem item={item} key={item.key}/>
      )
  }

  renderUserList(){
      console.log("ARE WE HERE?", this.props.instructor.booking);
    if(this.props.instructor.booking.length > 0)
    {
      return (
        <ul className="wide-list">
            {this.props.instructor.booking[0].participants.map(this.renderuser)}
        </ul>
      );
    }
                            
  }
  
  render() {
    const { course, booking, visible } = this.props.instructor;

    let weekIndex = 0;
    if (hasTimePassed(course.day, course.start)) {
      weekIndex = 1;
    } else {
      weekIndex = 0;
    }
    let day = getCourseTimeLocal(weekIndex, course.start, course.day);
    let dayStr = getDayStr(day) + " " + getTimeStr(day);

    let bookingPerCapacity = ""
    if(booking.length > 0){
      bookingPerCapacity = booking[0].reservations + "/" + course.maxCapacity
    }

    if(visible){
      return (
        <div className="course-info-container">
          <div className="course-info">
            <button className="exit-btn" onClick={this.exitContainer.bind(this)}>x</button>
            <div className="info-info-container">
              <h2>{course.courseType.name}</h2>
              <h3>{dayStr}    ( {bookingPerCapacity} )</h3>
              {this.renderUserList()}
            </div>
          </div>
        </div>
      )
    } else {
      return ( <div></div>)
    }
  }
}

function mapStateToProps(state) {
  return {  instructor: state.instructor }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(instructoractions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseDetails)

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getCourseTimeLocal, sameDay, hasDayPassed, hasTimePassed, timeToMoment, getDayStrMs, getTimeStrMs, getDayStr, getTimeStr } from '../../helpers/timeHelper.js'

import * as instructoractions from '../../actions/instructor.js'

class CourseDetails extends React.Component {

  constructor(){
    super();
    this.isVisible = false;
  }

  componentWillReceiveProps(nextProps){
    console.log("COURSEDETAILS:", nextProps);
  }



  exitContainer() {
    this.props.actions.clearInstructorData()
  }



  render() {
    const { instructor, currentUser } = this.props;

    if(instructor.visible){
      return (
        <div className="course-info-container">
          <div className="course-info">
            <button className="exit-btn" onClick={this.exitContainer.bind(this)}>x</button>
            <div className="info-info-container">
              <h3>{currentUser.firstname}</h3>
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
  return {  instructor: state.instructor, currentUser: state.currentUser }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(instructoractions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseDetails)

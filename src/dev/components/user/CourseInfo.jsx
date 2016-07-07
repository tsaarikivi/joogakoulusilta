import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionCreators from '../../actions/courses.js'

class CourseInfo extends React.Component {

  exitContainer() {
    this.props.actions.removeCourseInfo()
    console.log("REMOVED COURSE INFO STATE")
  }

  render() {
    if(this.props.courseInfo) {
      return (
        <div className="course-info-container">
          <button className="exit-btn" onClick={this.exitContainer.bind(this)}>x</button>
          <h3>{this.props.courseInfo.courseType.name}</h3>
          <p>{this.props.courseInfo.courseType.desc}</p>
          <hr/>
          <p>Klo {this.props.courseInfo.start} - {this.props.courseInfo.end}</p>
          <p>Sijainti {this.props.courseInfo.place.name}, {this.props.courseInfo.place.address}</p>
          <hr/>
          <p>Joogaopettaja {this.props.courseInfo.instructor.name}</p>
          <hr/>
          <p>Ilmoittautuneita {this.props.courseInfo.users.length}/{this.props.courseInfo.maxCapacity}</p>
          <button className="btn-small">Ilmoittaudu</button>
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
  return { courseInfo: state.courseInfo }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseInfo)

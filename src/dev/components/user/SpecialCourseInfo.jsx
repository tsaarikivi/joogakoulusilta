import React from 'react'
import { connect } from 'react-redux'
import { removeSpecialCourseInfo } from '../../actions/specialCourses.js'

class SpecialCourseInfo extends React.Component {

  exitContainer() {
    this.props.removeSpecialCourseInfo()
  }

  render() {
    console.log("PROPS ARE", this.props.specialCourseInfo.info)
    if(this.props.specialCourseInfo.info) {
      return (
        <div className="course-info-container">
          <div className="course-info">
            <button className="exit-btn" onClick={this.exitContainer.bind(this)}>x</button>
            <div className="info-info-container">

              <h1>HELLO!</h1>
            
            </div>
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
  return {  specialCourseInfo: state.specialCourseInfo }
}

export default connect(mapStateToProps, { removeSpecialCourseInfo })(SpecialCourseInfo)

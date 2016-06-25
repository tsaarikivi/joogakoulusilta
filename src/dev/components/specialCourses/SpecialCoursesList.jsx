import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import SpecialCoursesItem from './SpecialCoursesItem.jsx'
import * as actionCreators from '../../actions/specialCourse.js'

export default class SpecialCoursesList extends React.Component {

  componentWillMount() {
    this.actions.fetchSpecialCourses()
  }

  renderSpecialCourseItems(item) {
    return (
      <SpecialCoursesItem key={item.key} item={item} />
    )
  }

  render() {
    return (
      <div className="container">
        <ul className="course-list">
          {this.props.specialCourses.map(this.renderSpecialCourseItems)}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { specialCourses: state.specialCourses }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpecialCoursesList)

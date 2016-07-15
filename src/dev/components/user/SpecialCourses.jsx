import React from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import SpecialCoursesItem from './SpecialCoursesItem.jsx'
import * as actionCreators from '../../actions/courses.js'

class SpecialCourses extends React.Component {

  componentWillMount() {
    this.props.actions.fetchSpecialCoursesBanner()
  }

  renderSpecialCoursesBanner(item) {
    return (
      <SpecialCoursesItem key={item.key} item={item} />
    )
  }

  render() {
    if (this.props.specialCoursesBanner.length > 0) {
      return (
        <div class="container">
          <div className="content-container">
            <h2>Tulevia erityiskursseja</h2>
            <ul class="narrow-list">
              {this.props.specialCoursesBanner.map(this.renderSpecialCoursesBanner)}
            </ul>
            <Link className="text-link text-link-white" to="specialCourses">Lisää erityiskursseja</Link>
          </div>
        </div>
      );
    }
    else {
      return (
        <div></div>
      )
    }
  }
}

function mapStateToProps(state) {
  return { specialCoursesBanner: state.specialCoursesBanner }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpecialCourses)

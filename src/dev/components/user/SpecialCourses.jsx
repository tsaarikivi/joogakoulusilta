import React from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import SpecialCoursesItem from './SpecialCoursesItem.jsx'
import * as actionCreators from '../../actions/specialCourse.js'

export default class SpecialCourses extends React.Component {

  renderSpecialCourseItems(item) {
    return (
      <SpecialCoursesItem key={item.key} item={item} />
    )
  }

  render() {
    return (
      <div class="container">
        <h2>Tulevia erityiskursseja</h2>
        <ul class="items-body">

        </ul>
        <Link className="text-link" to="specialCourses">Lisää erityiskursseja</Link>
      </div>
    );
  }
}

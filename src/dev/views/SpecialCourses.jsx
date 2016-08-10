import React from 'react'

import SpecialCoursesList from '../components/specialCourses/SpecialCourses.jsx'
import SpecialCourseInfo from '../components/specialCourses/SpecialCourseInfo.jsx'
import SpecialCoursesHeader from '../components/specialCourses/SpecialCoursesHeader.jsx'

export default class SpecialCourses extends React.Component {
  render() {
    return (
      <div>
        <SpecialCoursesHeader />
        <SpecialCoursesList />
        <SpecialCourseInfo />
      </div>
    )
  }
}

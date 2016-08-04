import React from 'react'

import SpecialCoursesList from '../components/specialCourses/SpecialCourses.jsx'
import SpecialCourseInfo from '../components/specialCourses/SpecialCourseInfo.jsx'
import ContactInfo from '../components/home/ContactInfo.jsx'
import SpecialCoursesHeader from '../components/specialCourses/SpecialCoursesHeader.jsx'

export default class SpecialCourses extends React.Component {
  render() {
    return (
      <div>
        <SpecialCoursesHeader />
        <SpecialCoursesList />
        <ContactInfo />
        <SpecialCourseInfo />
      </div>
    )
  }
}

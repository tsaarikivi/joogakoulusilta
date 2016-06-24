import React from "react";

import SpecialCoursesItem from './SpecialCoursesItem.jsx'

export default class SpecialCoursesList extends React.Component {
  render() {
    return (
      <div className="container">
        <ul className="course-list">
          <SpecialCoursesItem />
        </ul>
      </div>
    );
  }
}

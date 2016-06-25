import React from "react";

import UserHeader from '../components/user/UserHeader.jsx'
import SpecialCourses from '../components/user/SpecialCourses.jsx'
import Timetable from '../components/user/Timetable.jsx'

export default class User extends React.Component {
  render() {
    return (
      <div>
        <UserHeader />
        <SpecialCourses />
        <Timetable />
      </div>
    );
  }
}

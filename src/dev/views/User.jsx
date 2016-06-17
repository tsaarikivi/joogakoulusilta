import React from "react";

import UserHeader from '../components/user/UserHeader.jsx'
import SpecialCourses from '../components/user/SpecialCourses.jsx'
import TimeTable from '../components/user/TimeTable.jsx'

export default class User extends React.Component {
  render() {
    return (
      <div>
        <UserHeader />
        <SpecialCourses database={this.props.route.database}/>
        <TimeTable />
      </div>
    );
  }
}

import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionCreators from '../actions/auth.js'

import UserHeader from '../components/user/UserHeader.jsx'
import SpecialCourses from '../components/user/SpecialCourses.jsx'
import Timetable from '../components/user/Timetable.jsx'

class User extends React.Component {
  render() {
    return (
      <div>
        <UserHeader curUsr={this.props.currentUser}/>
        <SpecialCourses />
        <Timetable />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { currentUser: state.currentUser }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)

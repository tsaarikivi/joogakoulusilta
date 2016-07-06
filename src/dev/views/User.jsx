import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionCreators from '../actions/user.js'

import UserHeader from '../components/user/UserHeader.jsx'
import SpecialCourses from '../components/user/SpecialCourses.jsx'
import Timetable from '../components/user/Timetable.jsx'

class User extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  componentWillMount(){
    console.log("User-will-mount:ACTIONS: ",this.props.actions);
    console.log("User-will-mount:AUTH: ",this.props.auth);
    if( this.props.auth.uid ) {
      this.props.actions.fetchUserDetails(this.props.auth.uid)
    }
    else {
      this.context.router.push('/');
    }

  }

  render() {
    return (
      <div>
        <UserHeader curUsr={this.props.currentUser}/>
        <SpecialCourses />
        <Timetable/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth, currentUser: state.currentUser }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)

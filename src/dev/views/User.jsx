import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionCreators from '../actions/user.js'

import UserHeader from '../components/user/UserHeader.jsx'
import SpecialCourses from '../components/user/SpecialCourses.jsx'
import Timetable from '../components/user/Timetable.jsx'
import CourseInfo from '../components/user/CourseInfo.jsx'

class User extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  constructor(){
    super();
    this.countMount = 0;
  }

  componentWillMount(){
    if( this.props.auth.uid ) {
      this.props.actions.fetchUserDetails(this.props.auth.uid);
      this.props.actions.fetchUsersTransactions(this.props.auth.uid);
      this.props.actions.fetchUsersBookings(this.props.auth.uid);
    }
    else {
      this.context.router.push('/');
    }
  }

  componentWillUnmount(){
    this.props.actions.finishedWithUserDetails();
  }

  componentWillReceiveProps(nextProps){
    if(typeof(nextProps.auth.uid) == "undefined"){
      this.context.router.push('/');
    }
  }


  render() {
    if( this.props.auth.uid &&
        this.props.currentUser.key != "0" &&
        typeof(this.props.currentUser.transactions) != "undefined" &&
        typeof(this.props.currentUser.bookings) != "undefined") {
        return (
            <div>
              <UserHeader curUsr={this.props.currentUser}/>
              <Timetable/>
              <CourseInfo />
              <SpecialCourses />
            </div>
          );
      } else {
          if (this.props.auth.uid){
            return (
              <p> LADATAAN KÄYTTÄJÄTIETOJA.</p>
            );
          } else {
            return(<p> Ei käyttäjää</p>);
          }
      }
  }
}

function mapStateToProps(state) {
  return { auth: state.auth, currentUser: state.currentUser }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)

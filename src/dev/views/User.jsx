import React from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionCreators from '../actions/user.js'

import ContactInfo from '../components/home/ContactInfo.jsx'
import UserHeader from '../components/user/UserHeader.jsx'
import SpecialCourses from '../components/user/SpecialCourses.jsx'
import Timetable from '../components/user/Timetable.jsx'
import CourseInfo from '../components/user/CourseInfo.jsx'
import SpecialCourseInfo from '../components/user/SpecialCourseInfo.jsx'
import UserBookings from '../components/user/UserBookings.jsx'


class User extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  constructor(){
    super();
    this.countMount = 0;
  }

  componentWillMount(){
    if( !this.props.auth.uid ) {
      this.context.router.push('/');
    }
  }

  componentWillUnmount(){
  }

  componentWillReceiveProps(nextProps){
  }

  handleEmailVerify(){
      this.props.actions.sendEmailVerification()
  }


  render() {
    var emailVerification = null
    if(this.props.auth.uid){
      if(!this.props.auth.userdata.emailVerified){
        emailVerification =  <button className="btn-small btn-red float-left" onClick={this.handleEmailVerify.bind(this)}>Varmista sähköpostisi</button>
      }
    }
    if( this.props.auth.uid &&
        this.props.currentUser.key != "0" &&
        typeof(this.props.currentUser.transactions) != "undefined" &&
        typeof(this.props.currentUser.bookings) != "undefined") {
        return (
            <div>
            {emailVerification}
              <UserHeader curUsr={this.props.currentUser}/>
              <UserBookings/>
              <Timetable/>
              <SpecialCourses />
              <ContactInfo />
              <CourseInfo />
              <SpecialCourseInfo />
            </div>
          );
      } else {
          if (this.props.auth.uid){
            return (
              <p className="centered"> Ladataan käyttäjätietoja.</p>
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

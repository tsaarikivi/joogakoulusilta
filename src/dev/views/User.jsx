import React from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as userActionCreators from '../actions/user.js'
import * as lsActionCreators from '../actions/loadingScreen.js'

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
    this.lsShown = false;
    this.userFullyLoaded = false
  }

  componentWillMount(){
    if(this.props.currentUser.key === "0"){
      this.props.lsActions.showLoadingScreen("Ladataan käyttäjätiedot.")
      this.lsShown = true;
    }
  }
  componentWillReceiveProps(nextProps){
    const { currentUser, auth, loadingScreen } = nextProps;
      if( currentUser.bookingsReady && currentUser.transactionsReady && currentUser.specialCoursesReady) {
          this.userFullyLoaded = true;
          if(this.lsShown){
            this.props.lsActions.hideLoadingScreen("Tervetuloa " + currentUser.firstname, 1000)
            this.lsShown = false
          }
        }
  }

  handleEmailVerify(){
      this.props.actions.sendEmailVerification()
  }


  render() {

    const { currentUser, auth } = this.props

    var emailVerification = null
    if(auth.uid){
      if(!auth.userdata.emailVerified){
        emailVerification = <div className="container bordered-container"><div className=" centered content-container"><button className="btn-small btn-red" onClick={this.handleEmailVerify.bind(this)}>Varmista sähköpostisi</button></div></div>    
      }
    }
    if( this.userFullyLoaded ) {
        return (
            <div>              
              {emailVerification}
              <UserHeader curUsr={currentUser}/>
              <UserBookings/>
              <Timetable/>
              <SpecialCourses />
              <ContactInfo />
              <CourseInfo />
              <SpecialCourseInfo />
            </div>
          );
      } else {
            return (
              <div></div>
            );
      }
  }
}

function mapStateToProps(state) {
  return { auth: state.auth, currentUser: state.currentUser, loadingScreen: state.loadingScreen }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(userActionCreators, dispatch),
    lsActions: bindActionCreators(lsActionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)

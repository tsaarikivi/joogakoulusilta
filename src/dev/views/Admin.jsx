import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionCreators from '../actions/user.js'

import AdminHeader from '../components/admin/AdminHeader.jsx'
import ShopItemTimeForm from '../components/admin/ShopItemTimeForm.jsx'
import ShopItemCountForm from '../components/admin/ShopItemCountForm.jsx'
import CourseForm from '../components/admin/CourseForm.jsx'
import UserList from '../components/admin/UserList.jsx'
import AdminList from '../components/admin/AdminList.jsx'
import CourseTypeList from '../components/admin/CourseTypeList.jsx'
import CourseList from '../components/admin/CourseList.jsx'
import CourseTypeForm from '../components/admin/CourseTypeForm.jsx'
import InstructorList from '../components/admin/InstructorList.jsx'
import ShopList from '../components/admin/ShopList.jsx'
import SpecialCourseForm from '../components/admin/SpecialCourseForm.jsx'
import PlaceForm from '../components/admin/PlaceForm.jsx'
import PlaceList from '../components/admin/PlaceList.jsx'
import InfoList from '../components/admin/InfoList.jsx'


class Admin extends React.Component {

constructor(){
  super()
  this.allowShow = false;
}

 componentWillMount(){
    if( this.props.auth.uid ) {
      this.props.actions.fetchUserDetails(this.props.auth.uid);
    }
    else {
      this.context.router.push('/');
    }
  }

  componentWillUnmount(){
    this.props.actions.finishedWithUserDetails();
  }

componentWillReceiveProps(nextProps){
  console.log("ADMIN: ", nextProps)
  if(nextProps.currentUser.roles.admin === true){
    this.allowShow = true;
  }
}

  render() {
    if(this.props.currentUser.key === "0"){
      return <div/>
    }
    if(this.allowShow){
      return (
        <div>
          <AdminHeader />
          <AdminList />
          <InstructorList />
          <UserList />
          <InfoList />
          <PlaceList />
          <CourseTypeList />
          <CourseList />
          <ShopList />
          <PlaceForm />
          <CourseTypeForm />
          <CourseForm />
          <SpecialCourseForm />
          <ShopItemTimeForm />
          <ShopItemCountForm />
        </div>
      )
    } else {
      return(
        <div>
          <p>Sinun pitää olla järjestelmän pääkäyttäjä.</p>
          <p>Ota yhteys järjestelmän valvojaan lisäoikeuksien saamiseksi.</p>
       </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return { auth: state.auth, currentUser: state.currentUser }
}
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(Admin)

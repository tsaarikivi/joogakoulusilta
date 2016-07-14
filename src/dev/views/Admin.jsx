import React from 'react'

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

export default class Admin extends React.Component {
  render() {
    return (
      <div>
        <AdminHeader />
        <AdminList />
        <InstructorList />
        <UserList />
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
  }
}

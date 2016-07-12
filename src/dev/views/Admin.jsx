import React from 'react'

import AdminHeader from '../components/admin/AdminHeader.jsx'
import ShopItemForm from '../components/admin/ShopItemForm.jsx'
import CourseForm from '../components/admin/CourseForm.jsx'
import UserList from '../components/admin/UserList.jsx'
import AdminList from '../components/admin/AdminList.jsx'
import CourseList from '../components/admin/CourseList.jsx'
import CourseTypeForm from '../components/admin/CourseTypeForm.jsx'
import InstructorList from '../components/admin/InstructorList.jsx'
import ShopList from '../components/admin/ShopList.jsx'

export default class Admin extends React.Component {
  render() {
    return (
      <div>
        <AdminHeader />
        <AdminList />
        <InstructorList />
        <UserList />
        <CourseList />
        <ShopList />
        <CourseTypeForm />
        <CourseForm />
        <ShopItemForm />
      </div>
    )
  }
}

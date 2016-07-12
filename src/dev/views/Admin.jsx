import React from 'react'

import ShopItemForm from '../components/admin/ShopItemForm.jsx'
import CourseForm from '../components/admin/CourseForm.jsx'
import UserList from '../components/admin/UserList.jsx'
import AdminList from '../components/admin/AdminList.jsx'
import CourseTypeForm from '../components/admin/CourseTypeForm.jsx'

export default class Admin extends React.Component {
  render() {
    return (
      <div>
        <AdminList />
        <UserList />
        <CourseTypeForm />
        <CourseForm />
        <ShopItemForm />
      </div>
    )
  }
}

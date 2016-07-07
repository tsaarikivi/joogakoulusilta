import React from 'react'

import ShopItemForm from '../components/admin/ShopItemForm.jsx'
import CourseForm from '../components/admin/CourseForm.jsx'
import UserList from '../components/admin/UserList.jsx'

export default class Admin extends React.Component {
  render() {
    return (
      <div>
        <ShopItemForm />
        <CourseForm />
        <UserList />
      </div>
    )
  }
}

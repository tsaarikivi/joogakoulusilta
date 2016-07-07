import React from 'react'

import ShopItemForm from '../components/admin/ShopItemForm.jsx'
import CourseForm from '../components/admin/CourseForm.jsx'

export default class Admin extends React.Component {
  render() {
    return (
      <div>
        <ShopItemForm />
        <CourseForm />
      </div>
    )
  }
}

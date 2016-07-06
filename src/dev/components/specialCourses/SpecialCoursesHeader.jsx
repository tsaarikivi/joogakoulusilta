import React from 'react'
import { Link } from 'react-router'

export default class SpecialCoursesHeader extends React.Component {
  render() {
    return (
      <div className="container header-left">
        <Link className="text-link back-btn" to="user">&lt;Takaisin</Link>
        <h1>Erikoiskurssit</h1>
      </div>
    );
  }
}

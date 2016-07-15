import React from "react";

export default class SpecialCoursesItem extends React.Component {
  render() {
    return (
      <li className="special-course-item">
        <h3>{this.props.item.courseType.name}</h3>
        <p>{this.props.item.date}</p>
        <p>klo {this.props.item.start/36000} - {this.props.item.end/36000}</p>
      </li>
    );
  }
}

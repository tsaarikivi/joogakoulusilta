import React from "react";

export default class SpecialCoursesItem extends React.Component {
  render() {
    return (
      <li class="container">
        <h3>{this.props.item.title}</h3>
      </li>
    );
  }
}

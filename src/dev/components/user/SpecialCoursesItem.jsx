import React from "react";

export default class SpecialCoursesItem extends React.Component {
  render() {
    return (
      <li>
        <h3>KORJAA TITLE</h3>
        <p>{this.props.item.date}, klo {this.props.item.start} - {this.props.item.end}</p>
        <a className="btn-small" href="#">Lisätietoja</a>
      </li>
    );
  }
}

import React from "react";

export default class SpecialCoursesItem extends React.Component {
  render() {
    return (
      <li>
        <h3 className="item-title">{this.props.item.title}</h3>
        <p className="item-desc">{this.props.item.desc}</p>
        <p className="item-time">{this.props.item.date}, {this.props.item.start} - {this.props.item.end}</p>
        <p className="item-instructor">Vetäjä: {this.props.item.instructor.name}</p>
        <p className="item-users">Ilmoittautuneet: {this.props.item.users.length}/{this.props.item.maxCapacity}</p>
        <a href="#" className="btn-small">Ilmoittaudu</a>
      </li>
    );
  }
}

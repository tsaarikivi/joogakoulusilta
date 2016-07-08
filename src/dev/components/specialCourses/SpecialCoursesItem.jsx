import React from "react";

export default class SpecialCoursesItem extends React.Component {
  render() {
    return (
      <li>
        <h3 className="item-title">KORJAA TITLE</h3>
        <p className="item-time">{this.props.item.date}, {this.props.item.start} - {this.props.item.end}</p>
        <p className="item-desc">KORJAA DESC</p>
        <p className="item-instructor">KORJAA VETÄJÄ</p>
        <p className="item-users">Ilmoittautuneet: KORJAA USERS /{this.props.item.maxCapacity}</p>
        <a href="#" className="btn-small btn-blue">Ilmoittaudu</a>
      </li>
    );
  }
}

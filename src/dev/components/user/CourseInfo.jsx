import React from 'react'

export default class CourseInfo extends React.Component {
  render() {
    return (
      <div>
        <h3>{this.props.item.courseType.name}</h3>
        <p>{this.props.item.courseType.desc}</p>
        <hr/>
        <p>Klo {this.props.item.start} - {this.props.item.end}</p>
        <p>Sijainti {this.props.item.place.name}, {this.props.item.place.address}</p>
        <hr/>
        <p>Joogaopettaja {this.props.item.instructor.name}</p>
        <hr/>
        <p>Ilmoittautuneita {this.props.item.users.length}/{this.props.item.maxCapacity}</p>
        <button className="btn-small">Ilmoittaudu</button>
      </div>
    );
  }
}

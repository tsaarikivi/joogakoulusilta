import React from 'react'
import { connect } from 'react-redux'

import { putCourseInfo } from '../../actions/courses.js'


class TimeTableItem extends React.Component {

  constructor(){
    super();
    this.startDate = new Date();
    this.endDate = new Date();
  }

  getDisplayTime(date,time){
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    date.setTime(date.getTime()+time)
  }

  componentWillReceiveProps(nextProps){
    this.getDisplayTime(this.startDate, nextProps.item.start);
    this.getDisplayTime(this.endDate, nextProps.item.end);
  }

  componentWillMount(){
    this.getDisplayTime(this.startDate, this.props.item.start);
    this.getDisplayTime(this.endDate, this.props.item.end);
  }

  itemClicked() {
    this.props.putCourseInfo(this.props.item)
  }

  render() {
    return (
      <td onClick={() => this.itemClicked()}>
        <h3>{this.props.item.courseType.name}</h3>
        <p>{this.startDate.toTimeString().slice(0,5)} - {this.endDate.toTimeString().slice(0,5)}</p>
      </td>
    );
  }
}

export default connect(null, { putCourseInfo })(TimeTableItem)

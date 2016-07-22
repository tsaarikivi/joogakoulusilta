import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { putSpecialCourseInfo } from '../../actions/specialCourses.js'

class SpecialCoursesItem extends React.Component {

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
    console.log("PUTTING ITEM TO SCINFO", this.props.item)
    this.props.actions.putSpecialCourseInfo(this.props.item)
  }

  render() {
    return (
      <li className="special-course-item" onClick={() => this.itemClicked()}>
        <p>{this.props.item.title}</p>
        <p className="table-time">{this.props.item.date}</p>
        <p className="table-time">klo {this.startDate.toTimeString().slice(0,5)} - {this.endDate.toTimeString().slice(0,5)}</p>
      </li>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({putSpecialCourseInfo}, dispatch) }
}

export default connect(null, mapDispatchToProps)(SpecialCoursesItem)

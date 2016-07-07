import React from 'react'
import { connect } from 'react-redux'

import { putCourseInfo } from '../../actions/courses.js'


class TimeTableItem extends React.Component {

  itemClicked() {
    this.props.putCourseInfo(this.props.item)
  }

  render() {
    return (
      <td onClick={() => this.itemClicked()}>
        <h3>{this.props.item.courseType.name}</h3>
        <p>{this.props.item.start} - {this.props.item.end}</p>
      </td>
    );
  }
}

export default connect(null, { putCourseInfo })(TimeTableItem)

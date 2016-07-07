import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import { putCourseInfo } from '../../actions/courses.js'


class TimeTableItem extends React.Component {

  slotClicked(){

    var JOOGAURL = typeof(JOOGASERVER) === "undefined" ? 'http://localhost:3000/reserveSlot' : JOOGASERVER+'/reserveSlot'
    console.log("JOOGASERVER: ", JOOGASERVER);
    console.log("JOOGAURL: ", JOOGAURL);
    var that = this;
    console.log("CLICK", this.props);
    axios.post(
      JOOGAURL, {
        user: this.props.currentUser.key,
        slot: this.props.item
      })
      .then( response => {
        console.log(response);
      })
      .catch( error => {
        console.log(error);
      });
  }

  itemClicked() {
    this.props.putCourseInfo(this.props.item)
    console.log("PUTTING:", this.props.item)
  }

  render() {
    return (
      <td onClick={this.itemClicked().bind(this)}>
        <h3>{this.props.item.courseType.name}</h3>
        <button className="btn-small" onClick={this.slotClicked.bind(this)}>Varaa</button>
        <p>{this.props.item.start} - {this.props.item.end}</p>
      </td>
    );
  }
}

function mapStateToProps(state) {
  return { currentUser: state.currentUser }
}

export default connect(mapStateToProps, { putCourseInfo })(TimeTableItem)

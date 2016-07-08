import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import axios from 'axios'

import * as actionCreators from '../../actions/courses.js'

class CourseInfo extends React.Component {

  makeReservation() {
    var JOOGAURL = typeof(JOOGASERVER) === "undefined" ? 'http://localhost:3000/reserveSlot' : JOOGASERVER+'/reserveSlot'
    console.log("JOOGASERVER: ", JOOGASERVER);
    console.log("JOOGAURL: ", JOOGAURL);
    var that = this;
    console.log("CLICK", this.props);

    firebase.auth().currentUser.getToken(true).then( idToken => {
      console.log("IDTOKEN: ", idToken);

      axios.post(
        JOOGAURL, {
          user: idToken,
          courseInfo: that.props.courseInfo
        })
        .then( response => {
          console.log(response);
        })
        .catch( error => {
          console.log(error);
        });

      }).catch( error => {
        console.error("Failde to get authentication token for current user: ", error);
      });
  }

  exitContainer() {
    this.props.actions.removeCourseInfo()
    console.log("REMOVED COURSE INFO STATE")
  }

  render() {
    if(this.props.courseInfo) {
      return (
        <div className="course-info-container">
          <div className="course-info">
            <button className="exit-btn" onClick={this.exitContainer.bind(this)}>x</button>
            <h3>{this.props.courseInfo.courseType.name}</h3>
            <p>{this.props.courseInfo.courseType.desc}</p>
            <hr/>
            <p>Klo {this.props.courseInfo.start} - {this.props.courseInfo.end}</p>
            <p>Sijainti {this.props.courseInfo.place.name}, {this.props.courseInfo.place.address}</p>
            <hr/>
            <p>Joogaopettaja {this.props.courseInfo.instructor.name}</p>
            <hr/>
            <p>Ilmoittautuneita {this.props.courseInfo.users.length}/{this.props.courseInfo.maxCapacity}</p>
            <button className="btn-small btn-blue" onClick={this.makeReservation.bind(this)} >Ilmoittaudu</button>
          </div>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

function mapStateToProps(state) {
  return { courseInfo: state.courseInfo, currentUser: state.currentUser }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseInfo)

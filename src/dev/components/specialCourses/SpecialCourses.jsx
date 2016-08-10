import React from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import SpecialCoursesItem from './SpecialCoursesItem.jsx'
import * as actionCreators from '../../actions/specialCourses.js'

class SpecialCourses extends React.Component {

  componentWillMount() {
    this.props.actions.fetchSpecialCoursesBanner()
    this.props.actions.fetchSpecialCourseBookings()     
  }

  componentWillUnmount(){
    this.props.actions.stopSpecialCourseBookings()
  }

  renderSpecialCoursesBanner(item) {
    item.bookings = this.props.specialCoursesBanner.bookings[item.key] || 0;
    return (
      <SpecialCoursesItem key={item.key} item={item} admin={this.props.currentUser.roles.admin}/>
    )
  }

  render() {
    if (this.props.specialCoursesBanner.banner.length > 0 && this.props.specialCoursesBanner.bookingsReady) {
      return (
        <div class="container">
          <div className="content-container">
            <ul class="narrow-list">
              {this.props.specialCoursesBanner.banner.map(this.renderSpecialCoursesBanner.bind(this))}
            </ul>
          </div>
        </div>
      );
    }
    else {
      return (
        <div class="container">
          <div className="content-container">
            <p className="text-red">Ei tulevia erikoiskursseja. Tule myöhemmin uudelleen!</p>
          </div>
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return { specialCoursesBanner: state.specialCoursesBanner, currentUser: state.currentUser }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpecialCourses)

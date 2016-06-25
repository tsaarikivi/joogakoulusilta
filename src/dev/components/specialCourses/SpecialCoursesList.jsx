import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import SpecialCoursesItem from './SpecialCoursesItem.jsx'
import * as actionCreators from '../../actions/specialCourses.js'

class SpecialCoursesList extends React.Component {

  componentWillMount() {
    this.props.actions.fetchSpecialCourses()
  }

  renderSpecialCourseItems(item) {
    return (
      <SpecialCoursesItem key={item.key} item={item} />
    )
  }

  render() {
    return (
      <div className="container align-left">
        <ul className="wide-list">
          {this.props.specialCourses.map(this.renderSpecialCourseItems)}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { specialCourses: state.specialCourses }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpecialCoursesList)

import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {getDayStrMs, getTimeStrMs} from '../../helpers/timeHelper.js'

import { putSpecialCourseInfo } from '../../actions/specialCourses.js'

class SpecialCoursesItem extends React.Component {

  itemClicked() {
    this.props.actions.putSpecialCourseInfo(this.props.item)
  }

  userHasPurchasedThisAlready(){
    if(this.props.currentUser.transactions.details.special.find((item) => {
      return item.shopItemKey === this.props.item.key
    })) {
      return true;
    }
    return false;
  }


  render() {
    let userBooked = null;
    if(this.userHasPurchasedThisAlready()){
       userBooked = <img className="mini-icon margin-left" src="./assets/booked.png" />
    }
    const { item } = this.props;
    return (
      <li className="special-course-item" onClick={() => this.itemClicked()}>
        <p className="table-nonmargin">{item.title}</p>
        <p className="table-time">{getDayStrMs(item.date)}</p>
        <p className="table-time">{getTimeStrMs(item.start)} - {getTimeStrMs(item.end)}</p>
        <img className="mini-icon" src="./assets/group.png" />
        <p className="centered table-participants">{item.bookings}/{item.maxCapacity}</p>
        {userBooked}
      </li>
    );
  }
}

function mapStateToProps(state) {
  return { currentUser: state.currentUser }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({putSpecialCourseInfo}, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpecialCoursesItem)

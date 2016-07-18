import React from 'react'
import { connect } from 'react-redux'
import UserBooking from './UserBooking.jsx'

class UserCourseHistory extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }
  componentWillReceiveProps(nextProps){
    console.log("PROPSEJA tulee: ", nextProps);
  }

  renderEntry(item){
    return(
      <div className="booking-container">
        <p>{this.props.item.courseName} {getDayStrMs(this.props.item.courseTime)} {getTimeStrMs(this.props.item.courseTime)}</p>
      </div>
    )
  }

  render() {
      return (
        <div className="container bordered-container">
          <div className="content-container">
            <h2 className="header-collapse">Kurssihistoriasi</h2>
              <ul className="wide-list">
                {this.props.currentUser.history.map(this.renderEntry)}
              </ul>
          </div>
        </div>
      )
    }
}


function mapStateToProps(state) {
  return { auth: state.auth, currentUser: state.currentUser }
}

export default connect(mapStateToProps, null)(UserCourseHistory)

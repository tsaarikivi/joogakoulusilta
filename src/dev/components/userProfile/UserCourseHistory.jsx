import React from 'react'
import { connect } from 'react-redux'
import { getDayStrMs, getTimeStrMs } from '../../helpers/timeHelper.js'

class UserCourseHistory extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }
  componentWillReceiveProps(nextProps){
    console.log("PROPSEJA tulee: ", nextProps);
  }

  renderEntry(item){
    return(
      <div key={item.courseTime} className="booking-container">
        <p>{item.courseName} {getDayStrMs(item.courseTime)} {getTimeStrMs(item.courseTime)}</p>
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

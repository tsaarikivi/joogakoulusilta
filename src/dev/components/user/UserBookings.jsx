import React from 'react'
import { connect } from 'react-redux'
import UserBooking from './UserBooking.jsx'

class UserBookings extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }
  componentWillReceiveProps(nextProps){
  }

  renderBookings(item){
    return(<UserBooking key={item.courseTime} item={item}/>)
  }

  render() {
      return (
        <div className="container bordered-container">
          <div className="content-container">
            <h2 className="header-collapse">Tulevat varauksesi</h2>
              <ul className="wide-list">
                {this.props.currentUser.bookings.map(this.renderBookings)}
              </ul>
          </div>
        </div>
      )
    }
}


function mapStateToProps(state) {
  return { auth: state.auth, currentUser: state.currentUser }
}

export default connect(mapStateToProps, null)(UserBookings)

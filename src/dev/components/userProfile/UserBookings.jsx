import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actionCreators from '../../actions/user.js'
import UserBooking from './UserBooking.jsx'

class UserBookings extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }
  componentWillReceiveProps(nextProps){
    console.log("PROPSEJA tulee: ", nextProps);
  }


  renderBookings(item){
    return(<UserBooking key={item.courseTime} item={item}/>)
  }

  render() {
    var errorData = null;
    if(this.props.currentUser){
      if (this.props.currentUser.error.code != 0){
        errorData = <p>Error: {this.props.currentUser.error.message}</p>
      }
      return (
        <div className="container bordered-container">
          <div className="content-container">
            {errorData}
            <h2 className="header-collapse">Kurssihistoriasi ja varauksesi</h2>
              <ul className="wide-list">
                {this.props.currentUser.bookings.map(this.renderBookings)}
              </ul>

          </div>
        </div>
      )
    }
    return(<div/>)
  }
}


function mapStateToProps(state) {
  return { auth: state.auth, currentUser: state.currentUser }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserBookings)

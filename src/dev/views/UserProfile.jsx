import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ProfileHeader from '../components/userProfile/ProfileHeader.jsx'
import UserAuth from '../components/userProfile/UserAuth.jsx'
import UserDataForm from '../components/userProfile/UserDataForm.jsx'
import UserCourseHistory from '../components/userProfile/UserCourseHistory.jsx'
import UserTransactions from '../components/userProfile/UserTransactions.jsx'

class UserProfile extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  componentWillMount(){
  }

  componentWillUnmount(){
  }


  componentWillReceiveProps(nextProps){
  }


  render() {
    if(this.props.currentUser.key !== "0")
    {
      return(
        <div>
          <ProfileHeader userError={this.props.currentUser.error}/>
          <UserDataForm/>
          <UserTransactions/>
          <UserCourseHistory/>
        </div>
      );
    } else {
      return (<h2 className="centered">Ei käyttäjää</h2>)
    }
  }
}

function mapStateToProps(state) {
  return { auth: state.auth, currentUser: state.currentUser }
}

export default connect(mapStateToProps, null)(UserProfile)

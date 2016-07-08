import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import UserItem from './UserItem.jsx'
import { fetchUserList } from '../../actions/admin.js'

class UserList extends React.Component {
  componentWillMount() {
    this.props.fetchUserList()
  }

  renderUserList(user) {
    return (
      <UserItem key={user.key} user={user}/>
    )
  }

  render() {
    return (
      <div className="container">
        <h2>Käyttäjät</h2>
        <ul className="wide-list">
          {this.props.userList.map(this.renderUserList)}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { userList: state.userList }
}

export default connect(mapStateToProps, { fetchUserList })(UserList)

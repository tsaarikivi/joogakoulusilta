import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import UserItem from './UserItem.jsx'
import * as actionCreators from '../../actions/admin.js'

class UserList extends React.Component {
  componentWillMount() {
    this.props.actions.fetchUserList()
  }

  renderUserList(user) {
    return (
      <UserItem key={user.key} user={user}/>
    )
  }

  renderContent() {
    if (this.props.userList.expanded) {
      return (
        <ul className="wide-list">
          {this.props.userList.list.map(this.renderUserList)}
        </ul>
      )
    }
    else {
      return <div></div>
    }
  }

  renderExpandButton() {
    if(this.props.userList.expanded) {
      return <button className="expand-btn" onClick={() => this.props.actions.minimizeUserList()}>Piilota</button>
    }
    else {
      return <button className="expand-btn" onClick={() => this.props.actions.expandUserList()}>Avaa</button>
    }
  }

  render() {
    return (
      <div className="container bordered-container">
        <div className="content-container align-left">
          <h2 className="header-collapse">Käyttäjät</h2>
          {this.renderExpandButton()}
          {this.renderContent()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { userList: state.userList }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)

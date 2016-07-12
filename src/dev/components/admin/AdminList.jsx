import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import AdminItem from './AdminItem.jsx'
import * as actionCreators from '../../actions/admin.js'

class AdminList extends React.Component {
  
  componentWillMount() {
    this.props.actions.fetchAdminList()
  }

  renderAdminList(admin) {
    return (
      <AdminItem key={admin.key} admin={admin}/>
    )
  }

  renderContent() {
    if (this.props.adminList.expanded) {
      return (
        <ul className="wide-list">
          {this.props.adminList.list.map(this.renderAdminList)}
        </ul>
      )
    }
    else {
      return <div></div>
    }
  }

  renderExpandButton() {
    if(this.props.adminList.expanded) {
      return <button className="expand-btn" onClick={() => this.props.actions.minimizeAdminList()}>Piilota</button>
    }
    else {
      return <button className="expand-btn" onClick={() => this.props.actions.expandAdminList()}>Avaa</button>
    }
  }

  render() {
    return (
      <div className="container bordered-container">
        <div className="content-container align-left">
          <h2 className="header-collapse">Ylläpitäjät</h2>
          {this.renderExpandButton()}
          {this.renderContent()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { adminList: state.adminList }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminList)

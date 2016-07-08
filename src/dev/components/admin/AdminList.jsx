import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import AdminItem from './AdminItem.jsx'
import { fetchAdminList } from '../../actions/admin.js'

class AdminList extends React.Component {
  componentWillMount() {
    this.props.fetchAdminList()
  }

  renderAdminList(admin) {
    return (
      <AdminItem key={admin.key} admin={admin}/>
    )
  }

  render() {
    return (
      <div className="container">
        <h2>Ylläpitäjät</h2>
        <ul className="wide-list">
          {this.props.adminList.map(this.renderAdminList)}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { adminList: state.adminList }
}

export default connect(mapStateToProps, { fetchAdminList })(AdminList)

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Item from './UserItem.jsx'
import SearchBar from '../admin/SearchBar.jsx'

class UserList extends React.Component {

  renderList(item) {
    const { credits } = this.props.userOverview
    if (item.email.toUpperCase().indexOf(this.props.searchBar.value.toUpperCase()) !== -1) {
      return (
        <Item key={item.uid} item={item} credits={credits[item.uid]}/>
      )
    }    
  }

  renderContent() {
    const { userList } = this.props.userOverview
    return (
        <ul className="wide-list">
          <SearchBar />
          {userList.map(this.renderList.bind(this))}
        </ul>
      )
  }

  render() {
    return (
      <div className="container bordered-container">
        <div className="content-container align-left">          
          <h2 className="header-collapse">Käyttäjät</h2>
          {this.renderContent()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { userOverview: state.userOverview, searchBar: state.searchBar}
}

export default connect(mapStateToProps, null)(UserList)

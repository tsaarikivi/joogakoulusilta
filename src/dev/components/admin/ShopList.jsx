import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Item from './ShopItem.jsx'
import * as actionCreators from '../../actions/admin.js'

class ShopList extends React.Component {
  componentWillMount() {
    this.props.actions.fetchShopList()
  }

  renderList(item) {
    return (
      <Item key={item.key} item={item}/>
    )
  }

  renderContent() {
    if (this.props.list.expanded) {
      return (
        <ul className="wide-list">
          {this.props.list.list.map(this.renderList)}
        </ul>
      )
    }
    else {
      return <div></div>
    }
  }

  renderExpandButton() {
    if(this.props.list.expanded) {
      return <button className="expand-btn" onClick={() => this.props.actions.minimizeShopList()}>Piilota</button>
    }
    else {
      return <button className="expand-btn" onClick={() => this.props.actions.expandShopList()}>Avaa</button>
    }
  }

  render() {
    return (
      <div className="container bordered-container">
        <div className="content-container align-left">
          <h2 className="header-collapse">Kauppa</h2>
          {this.renderExpandButton()}
          {this.renderContent()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { list: state.shopList }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopList)

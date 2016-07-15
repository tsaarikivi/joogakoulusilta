import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ShopItem from './ShopItem.jsx'
import * as actionCreators from '../../actions/shop.js'

class ShopList extends React.Component {
  componentWillMount() {
    this.props.actions.fetchShopItems()
  }

  renderShopItems(item) {
    return (
      <ShopItem key={item.key} item={item}/>
    )
  }

  render() {
    return (
      <div className="container">
        <div className="content-container align-left">
          <ul className="wide-list">
            {this.props.shopItems.items.map(this.renderShopItems)}
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { shopItems: state.shopItems }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopList)

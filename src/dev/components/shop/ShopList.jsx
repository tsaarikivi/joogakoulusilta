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
    console.log(item);
    return (
      <ShopItem key={item.title} item={item} />
    )
  }

  render() {


    return (
      <div className="container shop-list-container">
        <button onClick={() => this.props.actions.addShopItem("testTitle", "testDesc", "testPrice")}>Add test item</button>
        <ul className="shop-list">
          {this.props.shopItems.map(this.renderShopItems)}
        </ul>
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

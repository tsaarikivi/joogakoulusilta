import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ShopItem from './ShopItem.jsx'
import * as shopActionCreators from '../../actions/shop.js'

class ShopList extends React.Component {
  componentWillMount() {
    if (this.props.shopItems.items.length === 0) {
      this.props.shopActions.fetchShopItems()
    }    
  }

  componentWillReceiveProps(nextProps){
  }

  renderShopItems(item) {
    let otProp = false
    const { oneTime } = this.props.currentUser.transactions.details;
    if( oneTime.length > 0){
      if( oneTime.find( listItem => { return listItem === item.key})){
        otProp = true;
      }
    }
    return (
      <ShopItem key={item.key} item={item} roles={this.props.currentUser.roles} ot={otProp}/>
    )
  }

  render() {
    if(this.props.shopItems.items.length > 0){
      return (
        <div className="container bordered-container">
          <div className="content-container align-left">
            <ul className="shop-list">
              {this.props.shopItems.items.map(this.renderShopItems.bind(this))}
            </ul>
          </div>
        </div>
      )
    } else {
        return(<div></div>)
    }
  }
}

function mapStateToProps(state) {
  return {
    shopItems: state.shopItems,
    currentUser: state.currentUser,
    auth: state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    shopActions: bindActionCreators(shopActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopList)

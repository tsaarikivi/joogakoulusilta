import React from 'react'

import ShopList from '../components/shop/ShopList.jsx'
import ShopHeader from '../components/shop/ShopHeader.jsx'
import ContactInfo from '../components/home/ContactInfo.jsx'

export default class Shop extends React.Component {
  render() {
    return (
      <div>
        <ShopHeader />
        <ShopList />
        <ContactInfo />
      </div>
    )
  }
}

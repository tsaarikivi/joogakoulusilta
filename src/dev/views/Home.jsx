import React from "react";

import ContactInfo from '../components/home/ContactInfo.jsx'
import HomeHeader from '../components/home/HomeHeader.jsx'
import HomeLoginRegister from '../components/home/HomeLoginRegister.jsx'

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <HomeHeader />
        <HomeLoginRegister />
        <ContactInfo />
      </div>
    );
  }
}

import React from "react";

import InfoHeader from '../components/info/InfoHeader.jsx'
import InfoList from '../components/info/InfoList.jsx'
import ContactInfo from '../components/home/ContactInfo.jsx'

export default class Info extends React.Component {
  render() {
    return (
      <div>
        <InfoHeader />
        <InfoList />
        <ContactInfo />
      </div>
    );
  }
}

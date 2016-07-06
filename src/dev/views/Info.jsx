import React from "react";

import InfoHeader from '../components/info/InfoHeader.jsx'
import PlaceInfo from '../components/info/PlaceInfo.jsx'
import InstructorInfo from '../components/info/InstructorInfo.jsx'

export default class Info extends React.Component {
  render() {
    return (
      <div>
        <InfoHeader />
        <PlaceInfo />
        <InstructorInfo />
      </div>
    );
  }
}

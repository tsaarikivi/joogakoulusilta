import React from "react";

import InfoHeader from '../components/info/InfoHeader.jsx'
import InfoPlace from '../components/info/InfoPlace.jsx'
import InfoTeachers from '../components/info/InfoTeachers.jsx'

export default class Info extends React.Component {
  render() {
    return (
      <div>
        <InfoHeader />
        <InfoPlace />
        <InfoTeachers />
      </div>
    );
  }
}

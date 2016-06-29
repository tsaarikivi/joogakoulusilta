import React from "react";
import TopBar from "../components/authentication/TopBar.jsx";

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <TopBar/>
        {this.props.children}
      </div>
    );
  }
}

import React from "react";
import AuthManager from '../components/authentication/AuthManager.jsx'

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <AuthManager />
        {this.props.children}
      </div>
    );
  }
}

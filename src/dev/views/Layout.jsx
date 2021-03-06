import React from "react";
import AuthManager from '../components/authentication/AuthManager.jsx'
import DiagnosticsManager from '../components/diagnostics/DiagnosticsManager.jsx'
import LoadingScreen from '../components/logos/LoadingScreen.jsx'
import TopBar from '../components/layout/TopBar.jsx'

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <DiagnosticsManager />
        <AuthManager />
        <LoadingScreen />
        <TopBar />
        {this.props.children}
      </div>
    );
  }
}

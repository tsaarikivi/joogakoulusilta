import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../../actions/diagnostics.js'

class DiagnosticsViewer extends React.Component {

  constructor(){
    super()
    this.startDate = new Date();
    this.endDate = new Date()
  }

  componentWillMount(){
    this.props.actions.fetchDiagnostics(this.startDate, this.endDate)
  }

  componentWillReceiveProps(nextProps){
    console.log("DV-next:", nextProps);
  }

  render() {
    return (
      <div class="container light-bg">
        <div className="content-container">
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { ddata: state.ddata, auth: state.auth, currentUser: state.currentUser }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiagnosticsViewer)

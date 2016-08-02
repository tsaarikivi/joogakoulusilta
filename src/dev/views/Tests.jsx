import React from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

var md5 = require('md5')

import * as testActionCreators from '../actions/test.js'

class Tests extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  constructor(){
    super();
  }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps){
  }

  test1(){
    let request = ""
    this.props.actions.test1('http://localhost:3000/paytrailnotification?ORDER_NUMBER=-KOAV7xtBHe6BtuYvbmX&TIMESTAMP=1470145564&PAID=AF2EA87226&METHOD=1&RETURN_AUTHCODE=A2747DCE5D552DCE6205A281755848A1');
  }
  test2(){
    let query = {
    METHOD: 1,
    ORDER_NUMBER: "-KOAuHQ5YVI9hu5S2hJl",
    PAID: "EE6EE2E856",
    RETURN_AUTHCODE: "5503EAB1304C67E814162F5FA66382D0",
    TIMESTAMP: 1470152414
    }
    this.props.actions.test2();
  }

  render() {
    return(
      <div>
        <button className="btn-small btn-red" onClick={this.test1.bind(this)}>Test-1</button>
        <button className="btn-small btn-red" onClick={this.test1.bind(this)}>Test-2</button>
      </div>
    )    
  }
}

function mapStateToProps(state) {
  return { auth: state.auth, currentUser: state.currentUser}
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(testActionCreators, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Tests)

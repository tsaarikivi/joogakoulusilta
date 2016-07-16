import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actionCreators from '../../actions/user.js'

class UserTransactions extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }


  render() {
    var errorData = null;
    if(this.props.currentUser){
      if (this.props.currentUser.error.code != 0){
        errorData = <p>Error: {this.props.currentUser.error.message}</p>
      }
    }
    return (
      <div className="container bordered-container">
        <div className="content-container">
          {errorData}
          <h2 className="header-collapse">Ostohistoriasi</h2>

        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return { auth: state.auth, currentUser: state.currentUser }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTransactions)

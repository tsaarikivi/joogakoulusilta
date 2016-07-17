import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actionCreators from '../../actions/user.js'

import {getDayStrMs, getTimeStrMs} from '../../helpers/timeHelper.js'

class UserTransaction extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }


  render() {

    var unused = "";
    if(this.props.item.type === "count"){
      unused = "Käyttämättä: " + this.props.item.unusedtimes + "/" + this.props.item.usetimes + " -- "
    }

    return (
        <div className="transaction-container">
          <p>Ostettu: {this.props.item.shopItem.title} -- {getDayStrMs(this.props.item.purchasetime)} </p>
          <p>{unused}Voimassa: {getDayStrMs(this.props.item.expires)} </p>
        </div>
    )
  }
}


function mapStateToProps(state) {
  return { auth: state.auth }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTransaction)

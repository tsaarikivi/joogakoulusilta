import React from 'react'
import { connect } from 'react-redux'
import UserTransaction from './UserTransaction.jsx'

class UserTransactions extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  renderTransaction(item){
    return(<UserTransaction key={item.purchasetime} item={item}/>)
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
          <p></p>
          <h3 className="header-collapse">Voimassaolevat</h3>
            <ul className="wide-list">
              {this.props.currentUser.transactions.details.valid.map(this.renderTransaction)}
            </ul>
          <h3 className="header-collapse">Vanhentuneet</h3>
            <ul className="wide-list">
              {this.props.currentUser.transactions.details.expired.map(this.renderTransaction)}
            </ul>

        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return { auth: state.auth, currentUser: state.currentUser }
}

export default connect(mapStateToProps, null)(UserTransactions)

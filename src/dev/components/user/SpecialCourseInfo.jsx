import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { removeSpecialCourseInfo } from '../../actions/specialCourses.js'
import * as shopActionCreators from '../../actions/shop.js'

class SpecialCourseInfo extends React.Component {

  constructor(){
    super();
    this.onceOnly = false;
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  handleClickToBuy(){
    if(!this.onceOnly){
      this.onceOnly = true;
      this.props.shopActions.addToCart(this.props.specialCourseInfo.info);
      this.props.shopActions.getClientTokenFromBraintree()
      this.context.router.push('checkout');
    }
  }

  cashPurchase(){
    if(!this.onceOnly){
      this.onceOnly = true;
      this.props.shopActions.addToCart(this.props.specialCourseInfo.info);
      this.props.shopActions.buyWithCash();
      this.context.router.push('checkout');
    }
  }

  exitContainer() {
    this.props.itemActions.removeSpecialCourseInfo()
    this.onceOnly = false;
  }

  render() {
    let admin = null;
    if(this.props.currentUser.roles.admin){
      admin = <button className="btn-small btn-blue" onClick={this.cashPurchase.bind(this)} >Käteisosto</button>
    }

    console.log("PROPS ARE", this.props.specialCourseInfo.info)
    if(this.props.specialCourseInfo.info) {
      return (
        <div className="course-info-container">
          <div className="course-info">
            <button className="exit-btn" onClick={this.exitContainer.bind(this)}>x</button>
            <div className="info-info-container">

              <h1>{this.props.specialCourseInfo.info.title}</h1>

              <span className="item-row">
                <button className="btn-small btn-blue btn-link" onClick={this.handleClickToBuy.bind(this)} >Osta</button>
              </span>
              <span className="item-row">
                {admin}
              </span>

            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {  specialCourseInfo: state.specialCourseInfo, currentUser: state.currentUser }
}

function mapDispatchToProps(dispatch) {
  return {
    shopActions: bindActionCreators(shopActionCreators, dispatch),
    itemActions: bindActionCreators({removeSpecialCourseInfo}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpecialCourseInfo)

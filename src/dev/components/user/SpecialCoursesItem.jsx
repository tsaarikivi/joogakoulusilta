import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionCreators from '../../actions/shop.js'

class SpecialCoursesItem extends React.Component {

  constructor(){
    super();
    this.startDate = new Date();
    this.endDate = new Date();
  }


  static contextTypes = {
    router: React.PropTypes.object
  }

  handleClick(){
    console.log("buy me:", this.props.item);
    this.props.actions.addToCart(this.props.item);
    this.props.actions.getClientTokenFromBraintree()
    this.context.router.push('checkout');

  }

  cashPurchase(){
    this.props.actions.addToCart(this.props.item);
    this.props.actions.buyWithCash();
    this.context.router.push('checkout');

  }

  getDisplayTime(date,time){
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    date.setTime(date.getTime()+time)
  }

  componentWillReceiveProps(nextProps){
    this.getDisplayTime(this.startDate, nextProps.item.start);
    this.getDisplayTime(this.endDate, nextProps.item.end);
  }

  componentWillMount(){
    this.getDisplayTime(this.startDate, this.props.item.start);
    this.getDisplayTime(this.endDate, this.props.item.end);
  }

  render() {
    let admin = null;
    if(this.props.admin){
      admin = <button className="btn-small btn-blue" onClick={this.cashPurchase.bind(this)} >Käteisosto</button>
    }

    return (
      <li className="special-course-item">
        <p>{this.props.item.courseType.name}</p>
        <p className="table-time">{this.props.item.date}</p>
        <p className="table-time">klo {this.startDate.toTimeString().slice(0,5)} - {this.endDate.toTimeString().slice(0,5)}</p>
        <span className="item-row">
          <button className="btn-small btn-blue btn-link" onClick={this.handleClick.bind(this)} >Osta</button>
        </span>
        <span className="item-row">
          {admin}
        </span>
      </li>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(null, mapDispatchToProps)(SpecialCoursesItem)

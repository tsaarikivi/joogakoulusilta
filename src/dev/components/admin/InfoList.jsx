import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Item from './InfoItem.jsx'
import * as actionCreators from '../../actions/admin.js'
import InfoForm from '../../components/admin/InfoForm.jsx'

class InfoList extends React.Component {

  constructor(){
    super();
    this.addingNew = false
  }

  componentWillMount() {
    console.log("InfoListComponentWill mount")
    this.props.actions.fetchInfoList()
  }

  componentWillReceiveProps(nextProps){
      console.log("list next props:", nextProps)
      if(nextProps.cmp.expanded && nextProps.cmp.expander === "addNew"){
        this.addingNew = true;
      } else {
        this.addingNew = false;
      }
  }

  renderList(item) {
    return (
      <Item key={item.key} item={item}/>
    )
  }

  renderForm(){
    console.log("render form", this.addingNew)
    if(this.addingNew){
      return ( <InfoForm mode="addNew"/>)
    } else {
      return(<div></div>)
    }
  }

  toggleAdd(){
  if(this.addingNew){
      this.props.actions.minimizeInfoForm()
    } else {
      this.props.actions.expandInfoForm("addNew")
    }    
  }

  renderContent() {
    if (this.props.list.expanded) {
      return (
        <ul className="wide-list">
          {this.props.list.list.map(this.renderList)}
        </ul>
      )
    }
    else {
      return <div></div>
    }
  }

  renderExpandButton() {

    var buttonText = (this.addingNew)? "Peru lisäys" : "Lisää uusi"
    
    if(this.props.list.expanded) {
      return (
        <div>
        <button className="expand-btn" onClick={() => this.props.actions.minimizeInfoList()}>Piilota</button>
        <button className="expand-btn" onClick={() => this.toggleAdd()}>{buttonText}</button>
        </div>
      )
    }
    else {
      return <button className="expand-btn" onClick={() => this.props.actions.expandInfoList()}>Avaa</button>
    }
  }

  render() {
    return (
      <div className="container bordered-container">
        <div className="content-container align-left">
          <h2 className="header-collapse">Infot</h2>
          {this.renderExpandButton()}
          {this.renderForm()}
          {this.renderContent()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { list: state.infoList, cmp: state.infoForm }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoList)

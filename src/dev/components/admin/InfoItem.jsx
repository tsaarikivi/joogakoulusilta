import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../../actions/admin.js'
import InfoForm from '../../components/admin/InfoForm.jsx'


class InfoItem extends React.Component {
  
  constructor(){
    super();
    this.modifying = false
  }

  componentWillReceiveProps(nextProps){
      console.log("item next props:", nextProps)
      if(nextProps.cmp.expanded && nextProps.cmp.expander === this.props.item.key){
        this.modifying = true;
      } else {
        this.modifying = false;
      }
  }

  remove(item){
    console.log("remove", item)
    this.props.actions.removeInfoItem(item);
  }

  toggleModify(item){
    if(this.modifying){
      this.props.actions.minimizeInfoForm()
    } else {
      this.props.actions.expandInfoForm(item.key)
    }    
  }

  renderForm(item){
    console.log("render form", this.modifying)
    if(this.modifying){
      return ( <InfoForm mode="modify" dbKey={item.key} initialValues={item}/>)
    } else {
      return(<div></div>)
    }
  }

  render() {
    var buttonText = (this.modifying)? "Peru Muokkaus" : "Muokkaa"

    console.log("INFO_ITEM_RENDER: ", this.props)
    const {item} = this.props

    return (
      <li className="text-list-item">
        <span className="item-row">{item.title}</span>
        <span className="item-row">{item.content}</span>
        <button className="expand-btn" onClick={() => {this.toggleModify(item)}}>{buttonText}</button>
        <button className="expand-btn" onClick={() => {this.remove(item)}}>Poista</button>
        {this.renderForm(item)}
      </li>
    )
  }
}

function mapStateToProps(state) {
  return { cmp: state.infoForm }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoItem)

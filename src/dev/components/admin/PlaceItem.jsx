import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PlaceForm from '../../components/admin/PlaceForm.jsx'

import * as actionCreators from '../../actions/admin.js'

class PlaceItem extends React.Component {

  constructor(){
    super()
    this.toggleForm = false
  }

 componentWillReceiveProps(nextProps){
      if(nextProps.cmp.expanded && nextProps.cmp.expander === this.props.item.key){
        this.toggleForm = true;
      } else {
        this.toggleForm = false;
      }
  }

  remove(item){
    this.props.actions.removePlaceItem(item);
  }

  toggleModify(item){
    if(this.toggleForm){
      this.props.actions.minimizePlaceForm()
    } else {
      this.props.actions.expandPlaceForm(item.key)
    }    
  }


  renderForm(){
    if(this.toggleForm){
      return(<PlaceForm mode="modify" initialValues={this.props.item}/>)
    } else {
      return(<div></div>)
    }
              
  }


  render() {

    var buttonText = (this.toggleForm)? "Peru Muokkaus" : "Muokkaa"
    const {item} = this.props
    return (
      <li className="text-list-item">
        <span className="item-row">{this.props.item.name}</span>
        <span className="item-row">{this.props.item.address}</span>
        <button className="expand-btn" onClick={() => {this.toggleModify(item)}}>{buttonText}</button>
        <button className="expand-btn" onClick={() => {this.remove(item)}}>Poista</button>
        {this.renderForm(item)}
      </li>
    )
  }
}

function mapStateToProps(state) {
  return { cmp: state.placeForm }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceItem)

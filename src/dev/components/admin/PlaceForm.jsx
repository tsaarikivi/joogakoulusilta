import React from 'react'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'

import * as actionCreators from '../../actions/admin.js'

class PlaceForm extends React.Component {

  onSubmit(props) {
    this.props.actions.addPlace(props)
    location.reload()
  }

  renderContent() {
    const { fields: { name, desc, address }, handleSubmit } = this.props

    if (this.props.cmp.expanded) {
      return (
        <form onSubmit={handleSubmit(props => this.onSubmit(props))}>
          <label htmlFor="placeName">Paikan nimi</label>
          <input type="text" name="placeName" placeholder="esim: Joogakoulu Lauttasaari" {...name}/>

          <label htmlFor="placeAddress">Paikan osoite</label>
          <input type="text" name="placeAddress" placeholder="esim: Unioninkatu 45" {...address}/>

          <label htmlFor="placeDesc">Paikan kuvaus</label>
          <textarea type="text" name="placeDesc" placeholder="esim: Joogakoulu Lauttasaari on pieni ja rento joogastudio." {...desc}/>

          <button className="btn-small btn-blue" type="submit">Luo</button>
        </form>
      )
    }
    else {
      return <div></div>
    }
  }

  renderExpandButton() {
    if(this.props.cmp.expanded) {
      return <button className="expand-btn" onClick={() => this.props.actions.minimizePlaceForm()}>Piilota</button>
    }
    else {
      return <button className="expand-btn" onClick={() => this.props.actions.expandPlaceForm()}>Avaa</button>
    }
  }

  render() {
    return (
      <div className="container bordered-container">
       	<div className="content-container">
          <h2 className="header-collapse">Luo uusi joogapaikka</h2>
          {this.renderExpandButton()}
          {this.renderContent()}       
        </div> 
      </div>
    )
  }
}

function validate(values) {
  const errors = {}
  return errors;
  // TODO: form validation
}

function mapStateToProps(state) {
  return { cmp: state.placeForm }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

export default reduxForm({
  form: 'PlaceForm',
  fields: ['name', 'desc', 'address'],
  validate
}, mapStateToProps, mapDispatchToProps)(PlaceForm)

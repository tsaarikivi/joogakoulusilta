import React from 'react'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'

import * as actionCreators from '../../actions/admin.js'

class PlaceForm extends React.Component {

  onSubmit(props) {
    this.props.actions.addInfo(props)
    location.reload()
  }

  renderContent() {
    const { fields: { title, content }, handleSubmit } = this.props

    if (this.props.cmp.expanded) {
      return (
        <form onSubmit={handleSubmit(props => this.onSubmit(props))}>
          <label htmlFor="infotitle">Infon otsikko</label>
          <input type="text" name="infotitle" placeholder="esim: Joogakoulusta" {...title} />

          <label htmlFor="infocontent">Infon kuvaus</label>
          <textarea type="text" name="infocontent" placeholder="esim: Joogakoulu Lauttasaari on pieni ja rento joogastudio." {...content}/>

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
      return <button className="expand-btn" onClick={() => this.props.actions.minimizeInfoForm()}>Piilota</button>
    }
    else {
      return <button className="expand-btn" onClick={() => this.props.actions.expandInfoForm()}>Avaa</button>
    }
  }

  render() {
    return (
      <div className="container bordered-container">
       	<div className="content-container">
          <h2 className="header-collapse">Luo uusi Info</h2>
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
  return { cmp: state.infoForm }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

export default reduxForm({
  form: 'PlaceForm',
  fields: ['title', 'content'],
  validate
}, mapStateToProps, mapDispatchToProps)(PlaceForm)

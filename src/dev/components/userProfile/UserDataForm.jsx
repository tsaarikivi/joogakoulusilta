import React from 'react'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'

import * as actionCreators from '../../actions/user.js'

class UserDataForm extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  onSubmit(props) {
    var user = {
      uid: this.props.auth.uid,
      firstname: props.firstname,
      lastname: props.lastname,
    }
    this.props.actions.updateUserDetails(user)
  }

  renderContent() {
    if(!this.props.currentUser) return( <div></div>)

    const { fields: { firstname, lastname }, handleSubmit, load } = this.props

      return (
        <form onSubmit={handleSubmit(props => this.onSubmit(props))}>
          <label htmlFor="firstName">Etunimi</label>
          <input type="text" name="firstname"  {...firstname}/>

          <label htmlFor="lastName">Sukunimi</label>
          <input type="text" name="lastname" {...lastname}/>

          <p>Sähköpostisi: {this.props.currentUser.email}</p>

          <button className="btn-small btn-blue" type="submit">Päivitä</button>
        </form>
      )
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
          <h2 className="header-collapse">Tallennetut tietosi</h2>
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
  return { initialValues: state.currentUser, auth: state.auth, currentUser: state.currentUser }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

export default reduxForm({
  form: 'UserDataForm',
  fields: ['firstname', 'lastname']
}, mapStateToProps, mapDispatchToProps)(UserDataForm)

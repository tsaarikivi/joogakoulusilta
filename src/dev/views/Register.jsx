import React from "react"
import { Link } from "react-router"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import * as actionCreators from '../actions/auth.js'
import Logo from '../components/logos/JoogakouluLogo.jsx'

class Register extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  constructor(){
    super();
    this.email = "";
    this.password = "";
    this.firstName = "";
    this.alias = "";
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.auth.error.code != 0){
      this.errorText = nextProps.auth.error.message
    }
    else {
      this.errorText = "";
    }
    if(nextProps.auth.uid){
      this.context.router.push('/user/')
    }
  }

  doRegister(data){
    this.props.actions.register(data.email, data.password, data.firstName, data.lastName, null)
  }

  renderForm() {

    const { fields: { email, password, firstName, lastName, alias }, handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit(data => { this.doRegister(data) })}>
        <label htmlFor="email">Sähköposti</label>
        <input type="email" placeholder="Sähköposti" {...email} />
        {email.touched && email.error && <div className="form-error">{email.error}</div>}
        <label htmlFor="password">Salasana</label>
        <input type="password" placeholder="Salasana" {...password}/>
        {password.touched && password.error && <div className="form-error">{password.error}</div>}
        <label htmlFor="firstName">Etunimi</label>
        <input type="text" placeholder="Etunimi" {...firstName}/>
        {firstName.touched && firstName.error && <div className="form-error">{firstName.error}</div>}
        <label htmlFor="lastName">Sukunimi</label>
        <input type="text" placeholder="Sukunimi" {...lastName}/>
        {lastName.touched && lastName.error && <div className="form-error">{lastName.error}</div>}
        <br/>
        <button type="submit" className="btn-small btn-blue">Rekisteröidy</button>
        <br/>
      </form>
    );

  }

  render() {
      return (
        <div class="container">
          <Logo />
          <Link className="text-link back-btn" to="/">&lt;Takaisin</Link>
          <h2 className="centered login-header">Rekisteröidy käyttäjäksi</h2>
          <div className="content-container login-container">
            {this.renderForm()}
            <b>{this.errorText}</b>
          </div>  
        </div>
      );
  }
}

const validate = values => {
  const errors = {}
  const emailPattern = /(.+)@(.+){2,}\.(.+){2,}/
  if (!emailPattern.test(values.email)) {
    errors.email = 'Sähköpostiosoite on väärässä muodossa.'
  }
  if (!values.password) {
    errors.password = 'Pakollinen kenttä.'
  } else if (values.password.length < 6) {
    errors.password = 'Salasanan on oltava vähintään 6 merkkiä pitkä.'
  }
  if (!values.firstName) {
    errors.firstName = 'Pakollinen kenttä.'
  }
  if (!values.lastName) {
    errors.lastName = 'Pakollinen kenttä.'
  }
  return errors
}

function mapStateToProps(state) {
  return { auth: state.auth, currentUser: state.currentUser }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default reduxForm({
  form: 'RegisterForm',
  fields: ['email', 'password', 'firstName', 'lastName', 'alias'],
  validate
}, mapStateToProps, mapDispatchToProps)(Register)

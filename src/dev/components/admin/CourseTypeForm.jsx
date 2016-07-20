import React from 'react'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'

import * as actionCreators from '../../actions/admin.js'

class CourseTypeForm extends React.Component {

  onSubmit(props) {
    this.props.actions.addCourseType(props)
    location.reload()
  }

  renderContent() {
    const { fields: { name, desc }, handleSubmit } = this.props

    if (this.props.cmp.expanded) {
      return (
        <form onSubmit={handleSubmit(props => this.onSubmit(props))}> 
          <label htmlFor="courseType">Kurssityypin nimi</label>
          <input type="text" name="courseType" placeholder="esim: Flow jooga" {...name}/>

          <label htmlFor="courseDesc">Kurssityypin kuvaus</label>
          <textarea type="text" name="courseDesc" placeholder="esim: Flow jooga on rentoa joogaa." {...desc}/>

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
      return <button className="expand-btn" onClick={() => this.props.actions.minimizeCourseTypeForm()}>Piilota</button>
    }
    else {
      return <button className="expand-btn" onClick={() => this.props.actions.expandCourseTypeForm()}>Avaa</button>
    }
  }

  render() {    
    return (
      <div className="container bordered-container">
        <div className="content-container">
          <h2 className="header-collapse">Luo uusi kurssityyppi</h2>
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
  return { cmp: state.courseTypeFrom }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

export default reduxForm({
  form: 'CourseTypeForm',
  fields: ['name', 'desc'],
  validate
}, mapStateToProps, mapDispatchToProps)(CourseTypeForm)

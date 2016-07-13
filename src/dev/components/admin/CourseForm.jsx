import React from 'react'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'

import * as actionCreators from '../../actions/admin.js'

class CourseForm extends React.Component {
  onSubmit(props) {
    console.log("props:", props);
    this.props.actions.addCourse(props)
  }

  renderContent() {
    const { fields: { day, start, end, maxCapacity }, handleSubmit } = this.props

    if (this.props.cmp.expanded) {
      return (
        <form onSubmit={handleSubmit(props => this.onSubmit(props))}>        
          <label htmlFor="courseDay">Viikonpäivä</label>
          <select name="courseDay" {...day} value={day.value || ''}>
            <option>-- Valitse päivä --</option>
            <option value="1">Maanantai</option>
            <option value="2">Tiistai</option>
            <option value="3">Keskiviikko</option>
            <option value="4">Torstai</option>
            <option value="5">Perjantai</option>
            <option value="6">Lauantai</option>
            <option value="7">Sunnuntai</option>
          </select>

          <label htmlFor="courseStart">Alkaa klo.</label>
          <input type="number" name="courseStart" {...start} placeholder="esim: 800 tai 1000 tai 2130" />

          <label htmlFor="courseEnd">Loppuu klo.</label>
          <input type="number" name="courseEnd" {...end} placeholder="esim: 900 tai 1100 tai 2230" />

          <label htmlFor="courseMax">Maksimimäärä henkilöitä</label>
          <input type="number" name="courseMax" {...maxCapacity} placeholder="esim: 12 tai 1" />

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
      return <button className="expand-btn" onClick={() => this.props.actions.minimizeCourseForm()}>Piilota</button>
    }
    else {
      return <button className="expand-btn" onClick={() => this.props.actions.expandCourseForm()}>Avaa</button>
    }
  }

  render() {    
    return (
      <div className="container bordered-container">
        <div className="content-container">
          <h2 className="header-collapse">Luo uusi vakiokurssi</h2>
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
  return { cmp: state.courseForm }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

export default reduxForm({
  form: 'CourseForm',
  fields: ['day', 'start', 'end', 'maxCapacity'],
  validate
}, mapStateToProps, mapDispatchToProps)(CourseForm)

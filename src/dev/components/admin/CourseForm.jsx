import React from 'react'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'

import * as actionCreators from '../../actions/admin.js'

class CourseForm extends React.Component {
  onSubmit(props) {
    this.props.actions.addCourse(props, false)
    location.reload()
  }

  renderCourseTypeOptions(item) {
    return (
      <option key={item.key} value={item.key} >{item.key}</option>
    )
  }

  renderInstructorOptions(item) {
    return (
      <option key={item.key} value={item.key} >{item.firstname} {item.lastname}</option>
    )
  }

  renderPlaceOptions(item) {
    return (
      <option key={item.key} value={item.key} >{item.key}</option>
    )
  }

  renderContent() {
    const { fields: { day, start, end, maxCapacity, courseType, instructor, place }, handleSubmit } = this.props

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

          <label htmlFor="courseType">Kurssityyppi</label>
          <select name="courseType" {...courseType} value={courseType.value || ''}>
            <option>-- Valitse kurssityyppi --</option>
            {this.props.courseTypes.list.map(this.renderCourseTypeOptions)}
          </select>

          <label htmlFor="courseInstructor">Ohjaaja</label>
          <select name="courseInstructor" {...instructor} value={instructor.value || ''}>
            <option>-- Valitse ohjaaja --</option>
            {this.props.instructors.list.map(this.renderInstructorOptions)}
          </select>

          <label htmlFor="coursePlace">Paikka</label>
          <select name="coursePlace" {...place} value={place.value || ''}>
            <option>-- Valitse paikka --</option>
            {this.props.places.list.map(this.renderPlaceOptions)}
          </select>

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
  return { cmp: state.courseForm, courseTypes: state.courseTypeList, instructors: state.instructorList, places: state.placeList }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

export default reduxForm({
  form: 'CourseForm',
  fields: ['day', 'start', 'end', 'maxCapacity', 'courseType', 'instructor', 'place'],
  validate
}, mapStateToProps, mapDispatchToProps)(CourseForm)

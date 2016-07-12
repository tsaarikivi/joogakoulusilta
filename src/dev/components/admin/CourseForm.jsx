import React from 'react'
import { reduxForm } from 'redux-form'
import { addCourse } from '../../actions/admin.js'

class CourseForm extends React.Component {
  onSubmit(props) {
    console.log("props:", props);
    this.props.addCourse(props)
  }

  render() {
    const { fields: { day, start, end, maxCapacity }, handleSubmit } = this.props

    return (
      <div className="container bordered-container">
        <form onSubmit={handleSubmit(props => this.onSubmit(props))}>
          <h2>Luo uusi vakiokurssi</h2>

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
      </div>
    )
  }
}

function validate(values) {
  const errors = {}
  return errors;
}

export default reduxForm({
  form: 'CourseForm',
  fields: ['day', 'start', 'end', 'maxCapacity'],
  validate
}, null, {addCourse})(CourseForm)

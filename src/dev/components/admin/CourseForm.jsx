import React from 'react'
import { reduxForm } from 'redux-form'
import { addCourse } from '../../actions/courses.js'

class CourseForm extends React.Component {
  onSubmit(props) {
    console.log("props:", props);
    this.props.addCourse(props)
  }

  render() {
    const { fields: { day, start, end, maxCapacity, special, date }, handleSubmit } = this.props

    return (
      <div className="container">
        <form onSubmit={handleSubmit(props => this.onSubmit(props))}>
          <h2>Luo uusi kurssi</h2>

          <label>Viikonpäivä</label>
          <select name="day" {...day} value="1">
            <option value="1">Maanantai</option>
            <option value="2">Tiistai</option>
            <option value="3">Keskiviikko</option>
            <option value="4">Torstai</option>
            <option value="5">Perjantai</option>
            <option value="6">Lauantai</option>
            <option value="7">Sunnuntai</option>
          </select>

          <label>Alkaa klo.</label>
          <input type="number" name="start" {...start} placeholder="esim: 800 tai 1000 tai 2130" />

          <label>Loppuu klo.</label>
          <input type="number" name="end" {...end} placeholder="esim: 900 tai 1100 tai 2230" />

          <label>Maksimimäärä henkilöitä</label>
          <input type="number" name="maxCapacity" {...maxCapacity} placeholder="esim: 12 tai 1" />

          <label>Onko erikoiskurssi?</label>
          <select {...special} value="0">
            <option value="1">On</option>
            <option value="0">Ei</option>
          </select>

          <label>Erikoiskurssin päivämäärä</label>
          <input type="text" name="date" placeholder="esim  1.1.2016 tai 10.10.2016" defaultValue="" {...date}/>

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
  fields: ['day', 'start', 'end', 'maxCapacity', 'special', 'date'],
  validate
}, null, {addCourse})(CourseForm)

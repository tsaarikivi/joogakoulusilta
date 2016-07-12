import React from 'react'
import { reduxForm } from 'redux-form'
import { addCourse } from '../../actions/admin.js'

class SpecialCourseForm extends React.Component {
  onSubmit(props) {
    console.log("props:", props);
    this.props.addCourse(props)
  }

  render() {
    const { fields: { start, end, maxCapacity, date }, handleSubmit } = this.props

    return (
      <div className="container bordered-container">
        <form onSubmit={handleSubmit(props => this.onSubmit(props))}>
          <h2>Luo uusi erikoiskurssi</h2>

          <label htmlFor="SpecialDate">Erikoiskurssin päivämäärä</label>
          <input type="text" name="SpecialDate" {...date} placeholder="esim: 6.5.2016 tai 19.10.2016" />

          <label htmlFor="SpecialStart">Alkaa klo.</label>
          <input type="number" name="SpecialStart" {...start} placeholder="esim: 800 tai 1000 tai 2130" />

          <label htmlFor="specialEnd">Loppuu klo.</label>
          <input type="number" name="specialEnd" {...end} placeholder="esim: 900 tai 1100 tai 2230" />

          <label htmlFor="specialMax">Maksimimäärä henkilöitä</label>
          <input type="number" name="specialMax" {...maxCapacity} placeholder="esim: 12 tai 1" />

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
  form: 'SpecialCourseForm',
  fields: ['start', 'end', 'maxCapacity', 'date'],
  validate
}, null, {addCourse})(SpecialCourseForm)

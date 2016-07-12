import React from 'react'
import { reduxForm } from 'redux-form'
import { addCourseType } from '../../actions/courses.js'

class CourseTypeForm extends React.Component {

  onSubmit(props) {
    console.log("props:", props);
    this.props.addCourseType(props)
  }

  render() {
    const { fields: { name, desc }, handleSubmit } = this.props

    return (
      <div className="container bordered-container">
        <form onSubmit={handleSubmit(props => this.onSubmit(props))}>
          <h2>Luo uusi kurssityyppi</h2>

          <label>Kurssityypin nimi</label>
          <input type="text" placeholder="Flow jooga" {...name}/>

          <label>Kurssityypin kuvaus</label>
          <textarea type="text" placeholder="Flow jooga on rentoa joogaa." {...desc}/>

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
  form: 'CourseTypeForm',
  fields: ['name', 'desc'],
  validate
}, null, {addCourseType})(CourseTypeForm)

import React from 'react'
import { reduxForm } from 'redux-form'
import { addCourseType } from '../../actions/admin.js'

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

          <label htmlFor="courseType">Kurssityypin nimi</label>
          <input type="text" name="courseType" placeholder="esim: Flow jooga" {...name}/>

          <label htmlFor="courseDesc">Kurssityypin kuvaus</label>
          <textarea type="text" name="courseDesc" placeholder="esim: Flow jooga on rentoa joogaa." {...desc}/>

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

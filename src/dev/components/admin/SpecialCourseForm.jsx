import React from 'react'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'

import * as actionCreators from '../../actions/admin.js'

class SpecialCourseForm extends React.Component {
  onSubmit(props) {
    this.props.actions.addSpecialCourse(props)
    // TODO : change actions to on instead of ONCE take reloads away
  }

  renderCourseTypeOptions(item) {
    return (
      <option key={item.key} value={item.key} >{item.key}</option>
    )
  }

  renderInstructorOptions(item) {
    return (
      <option key={item.key} value={item.uid} >{item.firstname} {item.lastname}</option>
    )
  }

  renderPlaceOptions(item) {
    return (
      <option key={item.key} value={item.key} >{item.key}</option>
    )
  }

  renderContent() {
    const { fields: { start, end, maxCapacity, date, courseType, place, instructor, price, beforetax, taxamount, taxpercent }, handleSubmit } = this.props

    if (this.props.cmp.expanded) {
      return (
        <form onSubmit={handleSubmit(props => this.onSubmit(props))}>
          <label htmlFor="SpecialDate">Erikoiskurssin päivämäärä</label>
          <input type="text" name="SpecialDate" {...date} placeholder="esim: 6.5.2016 tai 19.10.2016" />

          <label htmlFor="SpecialStart">Alkaa klo.</label>
          <input type="number" name="SpecialStart" {...start} placeholder="esim: 800 tai 1000 tai 2130" />

          <label htmlFor="specialEnd">Loppuu klo.</label>
          <input type="number" name="specialEnd" {...end} placeholder="esim: 900 tai 1100 tai 2230" />

          <label htmlFor="specialMax">Maksimimäärä henkilöitä</label>
          <input type="number" name="specialMax" {...maxCapacity} placeholder="esim: 12 tai 1" />

          <label htmlFor="scourseType">Kurssityyppi</label>
          <select name="scourseType" {...courseType} value={courseType.value || ''}>
            <option>-- Valitse kurssityyppi --</option>
            {this.props.courseTypes.list.map(this.renderCourseTypeOptions)}
          </select>

          <label htmlFor="scourseInstructor">Ohjaaja</label>
          <select name="scourseInstructor" {...instructor} value={instructor.value || ''}>
            <option>-- Valitse ohjaaja --</option>
            {this.props.instructors.list.map(this.renderInstructorOptions)}
          </select>

          <label htmlFor="scoursePlace">Paikka</label>
          <select name="scoursePlace" {...place} value={place.value || ''}>
            <option>-- Valitse paikka --</option>
            {this.props.places.list.map(this.renderPlaceOptions)}
          </select>

          <label htmlFor="SCbeforetax">Hinta ennen veroja</label>
          <input type="number" name="SCbeforetax" {...beforetax} placeholder="esim: 10.5 tai 50" />

          <label htmlFor="SCtaxa">Veron määrä</label>
          <input type="number" name="SCtaxa" {...taxamount} placeholder="esim: 10.5 tai 50" />

          <label htmlFor="SCtaxp">Veroprosentti</label>
          <input type="number" name="SCtaxp" {...taxpercent} placeholder="esim: 10.5 tai 50" />
          
          <label htmlFor="SCprice">Verollinen hinta</label>
          <input type="number" name="SCprice" {...price} placeholder="esim: 10.5 tai 50" />

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
      return <button className="expand-btn" onClick={() => this.props.actions.minimizeSpecialCourseForm()}>Piilota</button>
    }
    else {
      return <button className="expand-btn" onClick={() => this.props.actions.expandSpecialCourseForm()}>Avaa</button>
    }
  }

  render() {
    return (
      <div className="container bordered-container">
        <div className="content-container">
          <h2 className="header-collapse">Luo uusi erikoiskurssi</h2>
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
  return { cmp: state.specialCourseFrom, courseTypes: state.courseTypeList, instructors: state.instructorList, places: state.placeList }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

export default reduxForm({
  form: 'SpecialCourseForm',
  fields: ['start', 'end', 'maxCapacity', 'date', 'courseType', 'place', 'instructor', 'price', 'beforetax', 'taxamount', 'taxpercent'],
  validate
}, mapStateToProps, mapDispatchToProps)(SpecialCourseForm)

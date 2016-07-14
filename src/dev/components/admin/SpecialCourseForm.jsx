import React from 'react'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'

import * as actionCreators from '../../actions/admin.js'

class SpecialCourseForm extends React.Component {
  onSubmit(props) {
    console.log("props:", props);
    this.props.actions.addCourse(props)
  }

  renderContent() {
    const { fields: { start, end, maxCapacity, date }, handleSubmit } = this.props

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
    console.log("PROPS: ", this.props);
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
  return { cmp: state.specialCourseFrom }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

export default reduxForm({
  form: 'SpecialCourseForm',
  fields: ['start', 'end', 'maxCapacity', 'date'],
  validate
}, mapStateToProps, mapDispatchToProps)(SpecialCourseForm)

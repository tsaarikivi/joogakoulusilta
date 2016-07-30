import React from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { mapDay } from '../../helpers/timeHelper.js'
import TimetableItem from './TimetableItem.jsx'
import * as actionCreators from '../../actions/courses.js'

class Timetable extends React.Component {

  componentWillMount() {
    this.props.actions.fetchTimetable();
  }

  componentWillUnmount(){
    this.props.actions.stopFetchTimetable();
  }

  renderTR(dayname, dayNumber){
    const { bookings, courses } = this.props.timetable;
    let day = new Date();
    let today = (dayNumber === mapDay(day.getDay()))? true: false;
    if(today){
    return(
      <tr className="glowing">
        <th className="text-bold text-blue">{dayname}</th>
        {
          courses.map(function(item) {
            if (item.day === dayNumber) {
              return (
                <TimetableItem key={item.key} item={item} booking={bookings[item.key]}/>
              )
            }
          })
        }
      </tr>
    )
    }
    return(
      <tr>
        <th>{dayname}</th>
        {
          courses.map(function(item) {
            if (item.day === dayNumber) {
              return (
                <TimetableItem key={item.key} item={item} booking={bookings[item.key]}/>
              )
            }
          })
        }
      </tr>
    )
  }

  render() {

    return (
      <div class="container timetable-container bordered-container">
        <div className="content-container align-left">
          <h2>Aikataulu</h2>
          <small>Klikkaa joogatuntia avataksesi lisätiedot ja varataksesi paikka tunnilta</small>
        </div>
        <table className="centered">
          <tbody>
          {this.renderTR("Maanantai", 1)}
          {this.renderTR("Tiistai", 2)}
          {this.renderTR("Keskiviikko", 3)}
          {this.renderTR("Torstai", 4)}
          {this.renderTR("Perjantai", 5)}
          {this.renderTR("Lauantai", 6)}
          {this.renderTR("Sunnuntai", 7)}
          </tbody>
        </table>        
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { timetable: state.timetable }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Timetable)

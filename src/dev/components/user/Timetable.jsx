import React from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import TimetableItem from './TimetableItem.jsx'
import * as actionCreators from '../../actions/courses.js'

class Timetable extends React.Component {

  componentWillMount() {
    this.props.actions.fetchTimetable()
  }

  render() {
    return (
      <div class="container timetable-container">
        <h2>Aikataulu</h2>
        <small>Klikkaa joogatuntia avataksesi lisätiedot ja varataksesi paikka tunnilta</small>
        <table>
          <tbody>
            <tr>
              <th>Maanantai</th>
              {
                this.props.timetable.map(function(item) {
                  if (item.day === 1) {
                    return (
                      <TimetableItem key={item.key} item={item} />
                    )
                  }
                })
              }
            </tr>
            <tr>
              <th>Tiistai</th>
                {
                  this.props.timetable.map(function(item) {
                    if (item.day === 2) {
                      return (
                        <TimetableItem key={item.key} item={item} />
                      )
                    }
                  })
                }
            </tr>
            <tr>
              <th>Keskiviikko</th>
                {
                  this.props.timetable.map(function(item) {
                    if (item.day === 3) {
                      return (
                        <TimetableItem key={item.key} item={item} />
                      )
                    }
                  })
                }
            </tr>
            <tr>
              <th>Torstai</th>
                {
                  this.props.timetable.map(function(item) {
                    if (item.day === 4) {
                      return (
                        <TimetableItem key={item.key} item={item} />
                      )
                    }
                  })
                }
            </tr>
            <tr>
              <th>Perjantai</th>
                {
                  this.props.timetable.map(function(item) {
                    if (item.day === 5) {
                      return (
                        <TimetableItem key={item.key} item={item} />
                      )
                    }
                  })
                }
            </tr>
            <tr>
              <th>Lauantai</th>
                {
                  this.props.timetable.map(function(item) {
                    if (item.day === 6) {
                      return (
                        <TimetableItem key={item.key} item={item} />
                      )
                    }
                  })
                }
            </tr>
            <tr>
              <th>Sunnuntai</th>
                {
                  this.props.timetable.map(function(item) {
                    if (item.day === 7) {
                      return (
                        <TimetableItem key={item.key} item={item} />
                      )
                    }
                  })
                }
            </tr>
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
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timetable)

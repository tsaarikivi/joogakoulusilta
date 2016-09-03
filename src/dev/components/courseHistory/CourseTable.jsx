import React from 'react'
import { connect } from 'react-redux'

import CourseItem from './CourseItem.jsx'

class CourseTable extends React.Component {

    render() {
        return (
        <div class="container timetable-container">
            <table className="centered">
            <tbody>
                {this.props.history.map(item => this.renderTableRow(item))}
            </tbody>
            </table>        
        </div>
        )
    }

    renderTableRow(item) {
        return <CourseItem key={item.key} item={item} />
    }
}

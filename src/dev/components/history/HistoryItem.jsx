import React from 'react'

import { Sparklines, SparklinesLine, SparklinesSpots, SparklinesReferenceLine } from 'react-sparklines'

export default class HistoryItem extends React.Component {

    render() {
        return <li className="history-item">
            <span className="history-course">{this.props.item.courseName}</span> <span>({this.props.item.weekday} {this.props.item.time})</span>
            <ul className="history-item-list">
                <small className="text-fade">keskiarvolla : {this.renderAverage()}</small>
                {this.renderItem()}
            </ul>
        </li>
    }

    renderItem() {
        return <Sparklines data={this.props.item.data}>
            <SparklinesLine color="#4ea1e8" />
            <SparklinesSpots />
            <SparklinesReferenceLine type="avg" />
        </Sparklines>
    }

    renderAverage() {
        let sum = 0
        this.props.item.data.map(amt => {
            sum += amt
        })
        return Number(sum / this.props.item.data.length).toFixed(2)
    }
}
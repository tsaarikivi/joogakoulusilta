import React from 'react'

export default class HistoryItem extends React.Component {

    render() {
        return <li className="history-item">
            <span className="history-course">{this.props.item.courseName}</span> <span>({this.props.item.weekday} {this.props.item.time})</span>
            <ul className="history-item-list">
                {this.renderItem()}
            </ul>
        </li>
    }

    renderItem() {
        let ret = []
        let i = 0
        this.props.item.data.map(amt => {
            ret.push(<li key={i++} className="history-amt">{amt}</li>)
        })
        return ret
    }
}
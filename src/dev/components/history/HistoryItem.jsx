import React from 'react'

import HistoryStatus from './HistoryStatus.jsx'

export default class HistoryItem extends React.Component {

    render() {
        return <li className="history-item">
            {this.renderCourseName()}
            <ul className="history-item-list">
                {this.renderItem()}
            </ul>
        </li>
    }

    renderItem() {
        const { item } = this.props
        let ret = []
        Object.keys(item).forEach(key => {
            let obj = item[key];
            let len = Object.keys(obj).length
            ret.push(<HistoryStatus amt={len} key={key} />)
        })
        return ret.reverse()
    }

    renderCourseName() {
        const { item } = this.props
        const people = item[Object.keys(item)[0]]
        const courseName = people[Object.keys(people)[0]].courseName
        return <div className="history-course">{courseName}</div>
    }
}
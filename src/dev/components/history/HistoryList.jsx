import React from 'react'

import HistoryItem from './HistoryItem.jsx'

import { getTimeStrMs, getDayStrMs } from '../../helpers/timeHelper.js'

export default class HistoryList extends React.Component {

    render() {
        return <div class="container">
            <div className="content-container">
                <ul className="history-list">
                    {this.renderList()}
                </ul>
            </div>
        </div>
    }

    createList(history) {
        let ret = []
        Object.keys(history).forEach(key => {
            let obj = history[key]

            let people = obj[Object.keys(obj)[0]]
            let dude = people[Object.keys(people)[0]]
            let courseName = dude.courseName
            let time = getTimeStrMs(Object.keys(obj)[0])
            let weekday = getDayStrMs(Object.keys(obj)[0]).slice(0, 2)
            let data = []
            Object.keys(obj).forEach(a => {
                let o = obj[a]
                data.push(Object.keys(o).length)
            })
            data.reverse()
            const r = {
                data,
                weekday,
                time,
                courseName,
                key
            }
            ret.push(r)
        })
        ret.sort((a, b) => {
            if (a.courseName < b.courseName) return -1
            else if (a.courseName > b.courseName) return 1
            else return 0
        })
        return ret
    }

    renderList() {
        let { history } = this.props
        let list = this.createList(history)
        let ret = []
        list.map(item => {
            ret.push(<HistoryItem key={item.key} item={item} />)
        })
        return ret
    }
}
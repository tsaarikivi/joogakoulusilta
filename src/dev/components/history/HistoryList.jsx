import React from 'react'

import HistoryItem from './HistoryItem.jsx'

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

    renderList() {
        let { history } = this.props
        let ret = []
        Object.keys(history).forEach(key => {
            let obj = history[key];
            ret.push(<HistoryItem item={obj} key={key} />)
        })
        return ret
    }
}
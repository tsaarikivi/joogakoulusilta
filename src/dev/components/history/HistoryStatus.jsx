import React from 'react'

export default class HistoryStatus extends React.Component {

    render() {
        return <li className="history-amt">
            {this.props.amt}
        </li>
    }
}
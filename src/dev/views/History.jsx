import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import HistoryHeader from '../components/history/HistoryHeader.jsx'
import HistoryList from '../components/history/HistoryList.jsx'
import historyActionCreators from '../actions/history.js'

class History extends React.Component {

    constructor() {
        super()
        this.allowShow = false;
    }

    static contextTypes = {
        router: React.PropTypes.object
    }

    componentWillMount() {
        if (this.props.currentUser.locked) {
            this.context.router.push('lockeduser')
        }
        this.props.historyActions.fetchHistory()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentUser.locked) {
            this.context.router.push('lockeduser')
        }
        if (nextProps.currentUser.roles.instructor === true || nextProps.currentUser.roles.admin === true) {
            this.allowShow = true;
        }
    }

    render() {
        if (this.allowShow) {
            return <div>
                <HistoryHeader />
                {this.renderHistory()}
            </div>
        }
        return <div></div>
    }

    renderHistory() {
        if (this.props.history) {
            return <HistoryList history={this.props.history} />
        }
        return <div></div>
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        currentUser: state.currentUser,
        history: state.history
    }
}

function mapDispatchToProps(dispatch) {
    return {
        historyActions: bindActionCreators(historyActionCreators, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(History)

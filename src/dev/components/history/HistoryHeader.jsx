import React from 'react'

export default class HistoryHeader extends React.Component {

    render() {
        return <div class="container header-container">
            <div className="content-container">
                <h1 className="nomargin nopadding">Historia</h1>
                <small className="text-fade margin-top margin-bottom small-info">Historiat per tunti, uusimmasta vanhimpaan</small>
            </div>
        </div>
    }
}
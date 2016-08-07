import React from 'react'

export default class TimetableHeader extends React.Component {
  render() {
    return (
      <div class="container header-container">
        <div className="content-container">
          <h1 className="nomargin nopadding">Aikataulu</h1>
          <small className="text-fade margin-top margin-bottom small-info">Klikkaa joogatuntia avataksesi lisätiedot ja varataksesi paikka tunnilta</small>
        </div>
      </div>
    )
  }
}
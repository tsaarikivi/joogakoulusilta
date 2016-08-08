import React from 'react'

export default class SpecialCoursesHeader extends React.Component {
  render() {
    return (
      <div class="container header-container">
        <div className="content-container">
          <h1 className="nomargin nopadding">Erikoiskurssit</h1>
          <small className="text-fade margin-top margin-bottom small-info">Klikkaa kurssia avataksesi lisätiedot</small>
        </div>
      </div>
    )
  }
}

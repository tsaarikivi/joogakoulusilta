import React from 'react'

export default class TimetableHeader extends React.Component {
  render() {
    return (
      <div class="container header-container">
        <div className="content-container">
          <h1 className="nomargin nopadding">Aikataulu</h1>
          <small className="text-red margin-top margin-bottom small-info">HUOM! Aikojen kanssa on ollut ongelmia. Syynä talviaikaan siirtyminen. Pahoittelumme - Nämä ajat ovat oikeat!</small>
          <small className="text-fade margin-top margin-bottom small-info">Tästä voit varata paikkasi tunneille. Tunteja voi varata aina viikoksi eteenpäin.</small>
          <small className="text-fade margin-top margin-bottom small-info">Klikkaa tuntia avataksesi lisätiedot sekä ostaaksesi ja varataksesi paikka tunnilta</small>
        </div>
      </div>
    )
  }
}

import React from 'react'

export default class TimetableHeader extends React.Component {
  render() {
    return (
      <div class="container header-container">
        <div className="content-container">
          <h1 className="nomargin nopadding">Aikataulu</h1>
          <small className="text-red margin-top margin-bottom small-info">HUOM! Talviaika teki tepposet eli tällä viikolla tunnit varattava viimeistään 1 h ennen tunnin alkua. Sen jälkeen tehdyt varaukset menevät viikon päähän ko. tunnille. Tervetuloa tunnille ilman varausta, jos tunti ei näytä täyttä! Ja mikäli haluat peruuttaa varauksesi, sinun tulee tehdä se poikkeuksellisesti NELJÄÄ tuntia ennen tunnin alkua. Otathan meihin tarvittaessa yhteyttä tarvittaessa joogakoulusilta@gmail.com. Pahoittelumme sekaannuksesta! Järjestelmää korjataan.</small>
          <small className="text-fade margin-top margin-bottom small-info">Tästä voit varata paikkasi tunneille. Tunteja voi varata aina viikoksi eteenpäin.</small>
          <small className="text-fade margin-top margin-bottom small-info">Klikkaa tuntia avataksesi lisätiedot sekä ostaaksesi ja varataksesi paikka tunnilta</small>
        </div>
      </div>
    )
  }
}

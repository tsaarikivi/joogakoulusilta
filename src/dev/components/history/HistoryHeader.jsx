import React from 'react'

export default class HistoryHeader extends React.Component {

    render() {
        return <div class="container header-container">
            <div className="content-container">
                <h1 className="nomargin nopadding">Historia</h1>
                <small className="text-fade margin-top margin-bottom small-info">Historiat per tunti, vanhimmasta uusimpaan</small>
                <small className="text-fade margin-top margin-bottom small-info">Huomaa, ettei kaikki tunnit näy tässä. Se johtuu siitä että kyseistä tuntia on muutettu eikä sen tilalle ole luotu uutta tuntia. Luo siis kokonaan uusi tunti jos haluat sille oman historian. Jos haluat vain muuttaa sen näkyvää nimeä, muuta kurssin tyyppi. Kuitenkaan historian nimeä ei voi muuttaa.</small>
            </div>
        </div>
    }
}
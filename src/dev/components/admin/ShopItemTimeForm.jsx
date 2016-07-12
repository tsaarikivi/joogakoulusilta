import React from 'react'
import { reduxForm } from 'redux-form'
import { addShopItem } from '../../actions/admin.js'

class ShopItemTimeForm extends React.Component {
  onSubmit(props) {
    console.log("props:", props);
    this.props.addShopItem(props, "time")
  }

  render() {
    const { fields: { desc, price, title, usedays }, handleSubmit } = this.props

    return (
      <div className="container bordered-container">
        <form onSubmit={handleSubmit(props => this.onSubmit(props))}>
          <h2>Luo uusi aikakortti</h2>

          <label htmlFor="timeDesc">Kuvaus</label>
          <textarea type="text" name="timeDesc" {...desc} placeholder="esim: Oikeus ilmoittautua mihin tahansa joogaan 6 viikon ajan." />

          <label htmlFor="timePrice">Hinta</label>
          <input type="number" name="timePrice" {...price} placeholder="esim: 10.5 tai 50" />

          <label htmlFor="timeTitle">Otsikko</label>
          <input type="text" name="timeTitle" {...title} placeholder="esim: 6 viikon kortti" />

          <label htmlFor="timeUsedays">Käyttömäärä päivinä</label>
          <input type="number" name="timeUsedays" {...usedays} placeholder="esim: 7 tai 14" />

          <button className="btn-small btn-blue" type="submit">Luo</button>
        </form>
      </div>
    )
  }
}

function validate(values) {
  const errors = {}
  return errors;
}

export default reduxForm({
  form: 'ShopItemTimeForm',
  fields: ['desc', 'price', 'title', 'usedays'],
  validate
}, null, {addShopItem})(ShopItemTimeForm)

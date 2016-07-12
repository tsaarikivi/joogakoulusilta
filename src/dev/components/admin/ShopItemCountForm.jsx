import React from 'react'
import { reduxForm } from 'redux-form'
import { addShopItem } from '../../actions/admin.js'

class ShopItemCountForm extends React.Component {
  onSubmit(props) {
    console.log("props:", props);
    this.props.addShopItem(props, "count")
  }

  render() {
    const { fields: { desc, price, title, usetimes, expiresAfterDays }, handleSubmit } = this.props

    return (
      <div className="container bordered-container">
        <form onSubmit={handleSubmit(props => this.onSubmit(props))}>
          <h2>Luo uusi kertakortti</h2>

          <label htmlFor="countDesc">Kuvaus</label>
          <textarea type="text" name="countDesc" {...desc} placeholder="esim: Oikeus ilmoittautua mihin tahansa joogaan 8 kertaa." />

          <label htmlFor="countPrice">Hinta</label>
          <input type="number" name="countPrice" {...price} placeholder="esim: 10.5 tai 50" />

          <label htmlFor="countTitle">Otsikko</label>
          <input type="text" name="countTitle" {...title} placeholder="esim: 4 kerran kortti" />

          <label htmlFor="countUsetimes">Käyttömäärä kertoina</label>
          <input type="number" name="countUsetimes" {...usetimes} placeholder="esim: 4 tai 8" />

          <label htmlFor="countExp">Kortin umpeutumisaika päivinä</label>
          <input type="number" name="countExp" {...expiresAfterDays} placeholder="esim: 30 tai 60" />

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
  form: 'ShopItemCountForm',
  fields: ['desc', 'price', 'title', 'usetimes', 'expiresAfterDays'],
  validate
}, null, {addShopItem})(ShopItemCountForm)

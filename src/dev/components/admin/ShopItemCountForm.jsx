import React from 'react'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'

import * as actionCreators from '../../actions/admin.js'

class ShopItemCountForm extends React.Component {
  onSubmit(props) {
    console.log("props:", props);
    this.props.actions.addShopItem(props, "count")
  }

  renderContent() {
    const { fields: { desc, price, title, usetimes, expiresAfterDays }, handleSubmit } = this.props

    if (this.props.cmp.expanded) {
      return (
        <form onSubmit={handleSubmit(props => this.onSubmit(props))}>          
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
      )
    }
    else {
      return <div></div>
    }
  }

  renderExpandButton() {
    if(this.props.cmp.expanded) {
      return <button className="expand-btn" onClick={() => this.props.actions.minimizeCountShopForm()}>Piilota</button>
    }
    else {
      return <button className="expand-btn" onClick={() => this.props.actions.expandCountShopForm()}>Avaa</button>
    }
  }

  render() {
    

    return (
      <div className="container bordered-container">
        <div className="content-container">
          <h2 className="header-collapse">Luo uusi kertakortti</h2>
          {this.renderExpandButton()}
          {this.renderContent()}
        </div>
      </div>
    )
  }
}

function validate(values) {
  const errors = {}
  return errors;
  // TODO: form validation
}

function mapStateToProps(state) {
  return { cmp: state.shopItemCountForm }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

export default reduxForm({
  form: 'ShopItemCountForm',
  fields: ['desc', 'price', 'title', 'usetimes', 'expiresAfterDays'],
  validate
}, mapStateToProps, mapDispatchToProps)(ShopItemCountForm)

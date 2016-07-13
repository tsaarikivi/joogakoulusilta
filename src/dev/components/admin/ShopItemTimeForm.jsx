import React from 'react'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'

import * as actionCreators from '../../actions/admin.js'

class ShopItemTimeForm extends React.Component {
  onSubmit(props) {
    console.log("props:", props);
    this.props.actions.addShopItem(props, "time")
  }

  renderContent() {
    const { fields: { desc, price, title, usedays }, handleSubmit } = this.props

    if (this.props.cmp.expanded) {
      return (
        <form onSubmit={handleSubmit(props => this.onSubmit(props))}>          
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
      )
    }
    else {
      return <div></div>
    }
  }

  renderExpandButton() {
    if(this.props.cmp.expanded) {
      return <button className="expand-btn" onClick={() => this.props.actions.minimizeTimeShopForm()}>Piilota</button>
    }
    else {
      return <button className="expand-btn" onClick={() => this.props.actions.expandTimeShopForm()}>Avaa</button>
    }
  }

  render() {    
    return (
      <div className="container bordered-container">
        <div className="content-container">
        <h2 className="header-collapse">Luo uusi aikakortti</h2>
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
  return { cmp: state.shopItemTimeForm }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

export default reduxForm({
  form: 'ShopItemTimeForm',
  fields: ['desc', 'price', 'title', 'usedays'],
  validate
}, mapStateToProps, mapDispatchToProps)(ShopItemTimeForm)

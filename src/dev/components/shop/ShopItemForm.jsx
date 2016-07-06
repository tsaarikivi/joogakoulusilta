import React from "react"
import { reduxForm } from 'redux-form'
import { addShopItem } from '../../actions/shop.js'
import _ from 'lodash'

const FIELDS = {
  title: {
    type: 'input',
    label: 'Nimi'
  },
  description: {
    type: 'textarea',
    label: 'Kuvaus'
  },
  price: {
    type: 'input',
    label: 'Hinta',
  },
  token: {
    type: 'input',
    label: 'Token'
  }
}

class ShopItemForm extends React.Component {

  onSubmit(props) {
    var title = props.title;
    var desc = props.description;
    var price = props.price;
    var token = props.token;
    this.props.addShopItem(title, desc, price, token);
    console.log("ShopItem added.");
  }

  renderField = (fieldConfig, field) => {
    const fieldHelper = this.props.fields[field];

    return (
      <div key={fieldConfig.label} className={'form-group ${fieldHelper.touched && fieldHelper.invalid ? "has-danger" : ""}'} >
        <label>{fieldConfig.label}</label>
        <fieldConfig.type type="text" className="form-control" {...fieldHelper} />
        <div className="form-error">
          {fieldHelper.touched ? fieldHelper.error : ''}
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <div className="container">
        <form onSubmit={handleSubmit(props => this.onSubmit(props))}>
          <h2>Luo uusi myyntikohde</h2>
          {_.map(FIELDS, this.renderField)}
          <button type="submit">Lähetä</button>
        </form>
      </div>
    )
  }
}

function validate(values) {
  const errors = {}

  _.each(FIELDS, (type, field) => {
    if (!values[field]) {
      errors[field] = "Kenttä ei voi olla tyhjä.";
    }
  });

  return errors;
}

export default reduxForm({
  form: 'ShopItemForm',
  fields: _.keys(FIELDS),
  validate
}, null, {addShopItem})(ShopItemForm)

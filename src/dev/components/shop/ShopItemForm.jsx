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
    label: 'Hinta'
  }
}

class ShopItemForm extends React.Component {

  onSubmit(props) {
    var title = props.title;
    var desc = props.description;
    var price = props.price;
    addShopItem(title, desc, price);
    console.log("ShopItem added.");
  }

  renderField = (fieldConfig, field) => {
    const fieldHelper = this.props.fields[field];

    return (
      <div className={'form-group ${fieldHelper.touched && fieldHelper.invalid ? "has-danger" : ""}'} >
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
          <h3>Luo uusi myyntikohde</h3>
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
})(ShopItemForm)

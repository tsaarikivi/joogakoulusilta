import React from 'react'
import { reduxForm } from 'redux-form'
import { addPlace } from '../../actions/admin.js'

class PlaceForm extends React.Component {

  onSubmit(props) {
    console.log("props:", props);
    this.props.addPlace(props)
  }

  render() {
    const { fields: { name, desc, address }, handleSubmit } = this.props

    return (
      <div className="container bordered-container">
        <form onSubmit={handleSubmit(props => this.onSubmit(props))}>
          <h2>Luo uusi joogapaikka</h2>

          <label htmlFor="placeName">Paikan nimi</label>
          <input type="text" name="placeName" placeholder="esim: Joogakoulu Lauttasaari" {...name}/>

          <label htmlFor="placeAddress">Paikan osoite</label>
          <input type="text" name="placeAddress" placeholder="esim: Unioninkatu 45" {...address}/>

          <label htmlFor="placeDesc">Paikan kuvaus</label>
          <textarea type="text" name="placeDesc" placeholder="esim: Joogakoulu Lauttasaari on pieni ja rento joogastudio." {...desc}/>

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
  form: 'PlaceForm',
  fields: ['name', 'desc', 'address'],
  validate
}, null, {addPlace})(PlaceForm)

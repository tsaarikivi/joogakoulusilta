import React from 'react'
import { connect } from 'react-redux'

import { changeSearch } from '../../actions/searchBar.js'

class SearchBar extends React.Component {

  componentWillMount() {
      this.props.changeSearch("")
  }

  handleChange(event) {
      this.props.changeSearch(event.target.value)
  }

  render() {
    return (
      <form>
        <label htmlFor="search">Haku</label>
        <input name="search" type="text" onChange={event => this.handleChange(event)}/>
      </form>
    )
  }
}

export default connect(null, { changeSearch })(SearchBar)

import React from 'react'
import { connect } from 'react-redux'

import { changeSearch } from '../../actions/searchBar.js'

class SearchBar extends React.Component {

  componentWillMount() {
      this.props.changeSearch("")
  }

  componentDidMount(){
    document.getElementById("userSearch").focus()
  }

  handleChange(event) {
      this.props.changeSearch(event.target.value)
  }

  render() {
    return (
      <form>
        <label htmlFor="usersearch">Haku</label>
        <input id="userSearch" name="usersearch" type="search" onChange={event => this.handleChange(event)}/>
      </form>
    )
  }
}

export default connect(null, { changeSearch })(SearchBar)
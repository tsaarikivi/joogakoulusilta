import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import PlaceInfoItem from './PlaceInfoItem.jsx'
import * as actionCreators from '../../actions/places.js'

class PlaceInfo extends React.Component {

  componentWillMount() {
    this.props.actions.fetchPlaceInfo()
  }

  renderPlaceInfoData(item) {
    return (
      <PlaceInfoItem key={item.key} item={item}/>
    )
  }

  render() {
    return (
      <div class="container about-place-container">
        <h2>Joogapaikat</h2>
        <ul className="wide-list align-left">
          {this.props.placeInfoData.map(this.renderPlaceInfoData)}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { placeInfoData: state.placeInfoData }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceInfo)

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import PlaceInfoItem from './PlaceInfoItem.jsx'
import * as actionCreators from '../../actions/instructors.js'

class InstructorInfo extends React.Component {

  componentWillMount() {
    this.props.actions.fetchInstructorInfo()
  }

  renderInstructorInfoData(item) {
    return (
      <PlaceInfoItem key={item.key} item={item}/>
    )
  }

  render() {
    return (
      <div class="container about-place-container">
        <h2>Joogaopettajat</h2>
        <ul className="wide-list align-left">
          {this.props.instructorInfo.map(this.renderInstructorInfoData)}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { instructorInfo: state.instructorInfo }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(InstructorInfo)

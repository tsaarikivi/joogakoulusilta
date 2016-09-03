import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../actions/courseHistory.js'

import CourseTable from '../components/courseHistory/CourseTable.jsx'

class CourseHistory extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  constructor(){
    super()
    this.allowShow = false;
  }

  componentWillMount() {
    this.props.actions.fetchCourseHistory()
  }

  componentWillUnmount() {
    this.props.actions.stopFetchCourseHistory()
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.currentUser.roles.admin === true){
      this.allowShow = true;
    }
  }

  render() {
    if(this.props.currentUser.key === "0"){
      return null
    }
    if(this.allowShow){
      return (
        <div>
            <h1>Tuntihistoria</h1>
            <CourseTable history={this.props.history}/>
        </div>
      )
    } else {
      return(
        <div>
          <p>Sinun pitää olla järjestelmän pääkäyttäjä.</p>
          <p>Ota yhteys järjestelmän valvojaan lisäoikeuksien saamiseksi.</p>
       </div>
      )
    }
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

function mapStateToProps(state) {
  return { currentUser: state.currentUser, history: state.courseHistory }
}

export default connect(mapStateToProps, null)(CourseHistory)




/** 
 * 
 * TODO: actions to fetch data.
 * - data max 30 last per course
 * - create a horizontal sliding view
 * - maybe design it beforehand
*/

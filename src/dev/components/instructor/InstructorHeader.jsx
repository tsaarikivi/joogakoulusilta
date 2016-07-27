import React from "react";
import { Link } from "react-router"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as instructoractions from '../../actions/instructor.js'

class InstructorHeader extends React.Component {

  componentWillMount(){
    this.props.actions.fetchInstructorData();
  }

  componentWillUnmount(){
    this.props.actions.stopFetchInstructorData();
  }

  render() {
    var errorOut = null
    const { error } = this.props.instructor
    if(this.props.instructor.error.code !== "OK"){
      errorOut = <p>Error: {error.code} {error.message}</p>
    }
    return (
      <div class="container bordered-container centered">
        {errorOut}
        <h1>Opettajan sivu</h1>
        <Link className="text-link back-btn" to="user">&lt;Takaisin</Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { instructor: state.instructor }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(instructoractions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(InstructorHeader)
import React from "react";
import { Link } from "react-router"
import { connect } from 'react-redux'

class LoadingScreen extends React.Component {

  render() {
    if(this.props.loadingScreen.visible){
      console.log("Loading screen visible")
      return (
        <div className="course-info-container">
          <p className="centered"> Loading </p>
          <br/>
          <p className="centered"> {this.props.loadingScreen.context} </p>
       </div>
      );
    } else {
      return (
        <div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return { loadingScreen: state.loadingScreen }
}

export default connect(mapStateToProps, null )(LoadingScreen)

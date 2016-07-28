import React from "react";
import { Link } from "react-router"
import { connect } from 'react-redux'

class LoadingScreen extends React.Component {

  render() {
    if(this.props.loadingScreen.visible){
      console.log("Loading screen visible")
      return (
        <div className="course-info-container">
          <div className="outer">
            <div className="middle">
              <div className="inner centered">
                <img className="loading-img" src="./assets/square.png" />
                <h3 className="text-white text-bold"> {this.props.loadingScreen.context} </h3>
              </div>
            </div>
          </div>          
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

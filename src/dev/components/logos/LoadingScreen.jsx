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
              <div className="inner">
                <h3 className="centered text-white text-bold"> Ladataan.. </h3>
                <h4 className="centered text-white text-bold"> {this.props.loadingScreen.context} </h4>
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

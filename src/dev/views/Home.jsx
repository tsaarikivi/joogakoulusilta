import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import ContactInfo from '../components/home/ContactInfo.jsx'
import HomeHeader from '../components/home/HomeHeader.jsx'
import HomeLoginRegister from '../components/home/HomeLoginRegister.jsx'

class Home extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  componentWillMount(){
    console.log("HOME will mount - auth", this.props.auth);
    if(this.props.auth.uid) {
      this.context.router.push('user');
    }
  }

  componentWillReceiveProps(nextProps){
    console.log("HOME: nextProps:", nextProps);
    if(nextProps.auth.uid) {
      this.context.router.push('user');
    }
  }

  render() {
    return (
      <div>
        <HomeHeader />
        <HomeLoginRegister />
        <ContactInfo />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth }
}

export default connect(mapStateToProps, null)(Home)

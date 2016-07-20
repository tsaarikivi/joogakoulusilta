import React from "react";
import Logo from '../components/logos/JoogakouluLogo.jsx'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionCreators from '../actions/user.js'

class ForgotPassword extends React.Component {

    static contextTypes = {
        router: React.PropTypes.object
    }

    handleClick(){
        var email = document.getElementById("resetEmail").value;
        this.props.actions.resetPassword(email)
        this.context.router.push('/')
    }

    render() {
        return (
            <div class="container centered">
                <Logo />
                <h2 className="centered login-header">Unohditko salasanasi?</h2>
                <small>Anna sähköpostiosoitteesi. Lähetämme sinulle salasanan vaihtolinkin.</small>
                <div className="content-container login-container">
                    <form>
                        <label>Sähköposti</label>
                        <input type="email" id="resetEmail"/>
                        <button className="btn-small btn-blue" onClick={this.handleClick.bind(this)}>Lähetä</button>
                    </form>
                </div>
            </div>
        )
    }
}


function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(null, mapDispatchToProps)(ForgotPassword)


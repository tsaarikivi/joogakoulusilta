import React from "react";
import Logo from '../components/logos/JoogakouluLogo.jsx'

export default class ForgotPassword extends React.Component {
    render() {
        return (
            <div class="container centered">
                <Logo />
                <h2 className="centered login-header">Unohditko salasanasi?</h2>
                <p>Anna sähköpostiosoitteesi. Lähetämme sinulle uuden salasanan.</p>
                <div className="content-container login-container">
                    <form>
                        <label>Sähköposti</label>
                        <input type="email"/>
                        <button className="btn-small btn-blue">Lähetä</button>
                    </form>
                </div>
            </div>
        )
    }
}

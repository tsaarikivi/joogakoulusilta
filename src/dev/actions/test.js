import axios from "axios"
import {
    _hideLoadingScreen,
    _showLoadingScreen
} from './loadingScreen.js'


export function test1(joogaurl) {
    
    return dispatch => {
        _showLoadingScreen(dispatch, "Aloitetaan testit")
            axios.get(joogaurl)
            .then(response => {
                _hideLoadingScreen(dispatch, "testi1 onnistui", true, 5000)
            })
            .catch(error => {
                console.error("TOKEN_ERROR:", error);
                _hideLoadingScreen(dispatch, "testi1 epäonnistui" + error, false, 5000)
            });
    }
}

export function test2(query) {
    let JOOGAURL = 'http://localhost:3000/completepaytrail'
    firebase.auth().currentUser.getToken(true)
    .then(idToken => {
        return axios.post(JOOGAURL, {
            current_user: idToken,
            METHOD: query.METHOD,
            ORDER_NUMBER: query.ORDER_NUMBER,
            PAID: query.PAID,
            RETURN_AUTHCODE: query.RETURN_AUTHCODE,
            TIMESTAMP: query.TIMESTAMP
        })
    })
    .then(response => {
        _hideLoadingScreen(dispatch, "Testi 2 onnistui", true)
    })
    .catch(error => {
        console.error("PAYTRAIL_ERROR:", error);
        _hideLoadingScreen(dispatch, "Testi 2 epäonnistui: " + error, false)
    });

}


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
                _hideLoadingScreen(dispatch, "testi1 epäonnistui", error.toString(), false, 5000)
            });
    }
}


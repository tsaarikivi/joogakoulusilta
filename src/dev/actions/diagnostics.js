
import { 
    CONFIGURE_DIAGNOSTICS, 
    FLUSH_DIAGNOSTICS, 
    FETCH_DIAGNOSTICS 
} from './actionTypes.js'

import {
    _hideLoadingScreen,
    _showLoadingScreen
} from './loadingScreen.js'


export function fetchDiagnostics(startDate, endDate){
    return dispatch => {
        _showLoadingScreen(dispatch, "Haetaan diagnostiikkadataa")
        firebase.database().ref('/diagnostics/').once('value')
        .then( snapshot => {
            _hideLoadingScreen(dispatch, "Haku valmis", true)
            dispatch({
                type: FETCH_DIAGNOSTICS,
                payload: {
                    dataReady:true,
                    data: snapshot.val()
                }
            })
        })
        .catch( error => {
            _hideLoadingScreen(dispatch, "Haku epäonnistui" + String(error), true)
            console.error("Fetching diagnostics data failed: ", error);
            dispatch({
                type: FETCH_DIAGNOSTICS,
                payload: {
                    dataReady:false,
                    data: error
                }
            })
        })
    }
}

export function diag(type, payload){
    return dispatch => {
        _diag(dispatch, type, payload)
    }
}

export function _diag(dispatch, type, payload){
        dispatch({
            type, 
            payload
        })
}


export function startDiagnostics() {
    return dispatch => {
      dispatch({
        type: CONFIGURE_DIAGNOSTICS,
        payload: {started: true, sessionKey: Date.now()}
      })
    }
}
export function flushDiagnostics(diag) {
    return dispatch => {
        _flushDiagnostics(dispatch, diag)
    }
}

function _flushDiagnostics(dispatch) {
        dispatch({
            type: FLUSH_DIAGNOSTICS
        })            
        dispatch({
            type: CONFIGURE_DIAGNOSTICS,
            payload: { flushed: true}
        })            
}

export function flushDiagnosticsAtInterval(milliseconds) {
    return dispatch => {
        dispatch({
            type: CONFIGURE_DIAGNOSTICS,
            payload: { flushed: false}
        })            
        setTimeout(() => {
            _flushDiagnostics(dispatch)
        }, milliseconds);
    }
}

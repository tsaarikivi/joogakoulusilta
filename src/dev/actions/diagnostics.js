
import { 
    CONFIGURE_DIAGNOSTICS, 
    FLUSH_DIAGNOSTICS, 
    FETCH_DIAGNOSTICS 
} from './actionTypes.js'

import {
    _hideLoadingScreen,
    _showLoadingScreen
} from './loadingScreen.js'


function processDDataToNumOfEvents(rawData){
    var returnData = {}
}
function processDDataToSessions(rawData){
    var returnData = {
        sessions: {
            hourlySessions: [],
            dailySessions: []
        }
    }
    let hour = -1;
    let hourly = 0;
    let day = -1;
    let daily = 0;
    let time = new Date();
    for (let session in rawData) {
        time.setTime(session);
        hourly++;
        daily++;
        if(hour !== time.getHours()){
            if(hour !== -1){
                returnData.sessions.hourlySessions = Array.concat(returnData.sessions.hourlySessions, hourly);
                hourly = 0;
            }
            hour = time.getHours()
        }
        if(day !== time.getDate()){
            if(day !== -1){
                returnData.sessions.dailySessions = Array.concat(returnData.sessions.dailySessions, daily);
                daily = 0;
            }
            day = time.getDate()
        }
    }
}

export function fetchDiagnostics(startDate, endDate){
    return dispatch => {
        var returnObject = {}
        _showLoadingScreen(dispatch, "Haetaan diagnostiikkadataa.")
        firebase.database().ref('/diagnostics/').orderByKey().startAt(String(startDate)).endAt(String(endDate)).once('value')
        .then( snapshot => {

            returnObject = Object.assing({}, returnObject,processDDataToSessions(snapshot.val()));
            returnObject = Object.assing({}, returnObject,processDDataToNumOfEvents(snapshot.val()));

            _hideLoadingScreen(dispatch, "Haku valmis", true)
            dispatch({
                type: FETCH_DIAGNOSTICS,
                payload: {
                    dataReady:true,
                    data: returnObject
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

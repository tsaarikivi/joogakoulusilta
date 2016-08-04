
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
    var returnData = {
        eventCounters: {}
    }
    return returnData;
}
function processDDataToSessions(rawData){
    var hourlySessions = Object.assign([])
    var dailySessions = Object.assign([])
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
                hourlySessions = Array.concat(hourlySessions, {x: hour, y: hourly});
                hourly = 0;
            }
            hour = time.getHours()
        }
        if(day !== time.getDate()){
            if(day !== -1){
                dailySessions = Array.concat(dailySessions, {x: day, y: daily});
                daily = 0;
            }
            day = time.getDate()
        }
    }
    if(hour !== -1 && hourly > 0){
        hourlySessions = Array.concat(hourlySessions, {x: hour, y: hourly});
    }
    if(day !== -1 && daily > 0){
        dailySessions = Array.concat(dailySessions, {x: day, y: daily});
    }
    return {sessions: { dailySessions, hourlySessions} };
}

export function fetchDiagnostics(startDate, endDate){
    return dispatch => {
        var returnObject = Object.assign({})
        _showLoadingScreen(dispatch, "Haetaan diagnostiikkadataa.")
        firebase.database().ref('/diagnostics/').orderByKey().startAt(String(startDate)).endAt(String(endDate)).once('value')
        .then( snapshot => {
            var rawData = snapshot.val();
            var sessionData = processDDataToSessions(rawData)
            returnObject = Object.assign({}, returnObject, sessionData);
            //returnObject = Object.assign({}, returnObject,processDDataToNumOfEvents(snapshot.val()));

            _hideLoadingScreen(dispatch, "Haku valmis", true)
            console.log("returnObject", returnObject);
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
/*            dispatch({
                type: FETCH_DIAGNOSTICS,
                payload: {
                    dataReady:false,
                    data: error
                }
            }) */
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


import { CONFIGURE_DIAGNOSTICS, FLUSH_DIAGNOSTICS } from './actionTypes.js'

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

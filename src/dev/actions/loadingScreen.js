import {
    CHANGE_LOADINGSCREEN_STATE
} from './actionTypes.js'

export function showLoadingScreen(context) {
    return dispatch => {
        _showLoadingScreen(dispatch, context)
    }
}

export function _showLoadingScreen(dispatch, context) {
    console.log("LoadingScreenOn")
    dispatch({
        type: CHANGE_LOADINGSCREEN_STATE,
        payload: {
            visible: true,
            context
        }
    });
}

export function hideLoadingScreen(context, timeout = 1000) {
    return dispatch => {
        _hideLoadingScreen(dispatch, context, timeout)
    }
}

export function _hideLoadingScreen(dispatch, context, timeout = 1000) {
    dispatch({
        type: CHANGE_LOADINGSCREEN_STATE,
        payload: {
            visible: true,
            context
        }
    });
    console.log("LoadingScreenOff")
    setTimeout(() => {
        dispatch({
            type: CHANGE_LOADINGSCREEN_STATE,
            payload: {
                visible: false,
                context
            }
        });
    }, timeout)
}
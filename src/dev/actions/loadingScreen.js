import {
    CHANGE_LOADINGSCREEN_STATE
} from './actionTypes.js'

export function setLoadingScreenOn(context) {
    return dispatch => {
        console.log("LoadingScreenOn")
        dispatch({
            type: CHANGE_LOADINGSCREEN_STATE,
            payload: {
                visible: true,
                context
            }
        });
    }
}

export function setLoadingScreenOff(context) {
    return dispatch => {
        _setLoadingScreenOff(dispatch, context)
    }
}

export function _setLoadingScreenOff(dispatch, context) {
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
    }, 2 * 1000)
}
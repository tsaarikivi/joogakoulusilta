import {
    FETCH_INSTRUCTOR_DATA,
    INSTRUCTOR_ERROR
} from './actionTypes.js'

export function fetchInstructorData() {
    return dispatch => {
        console.log("Fetch instructor data")
        dispatch({
            type: FETCH_INSTRUCTOR_DATA,
            payload: {}
        });
        dispatch({
            type: INSTRUCTOR_ERROR,
            payload: {
                error: {
                    code: "NOT_IMPLEMENTED",
                    message: "action not implemented"
                }
            }
        })
    }
}

export function stopFetchInstructorData() {
    return dispatch => {
        console.log("Fetch instructor data")
        dispatch({
            type: FETCH_INSTRUCTOR_DATA,
            payload: {}
        });
        dispatch({
            type: INSTRUCTOR_ERROR,
            payload: {
                error: {
                    code: "NOT_IMPLEMENTED",
                    message: "action not implemented"
                }
            }
        })
    }
}
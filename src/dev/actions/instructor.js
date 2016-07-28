import {
    FETCH_INSTRUCTOR_DATA,
    INSTRUCTOR_ERROR
} from './actionTypes.js'

export function fetchInstructorData(courseKey) {
    return dispatch => {
        var returnObject = {}
        console.log("Fetch instructor data")

        returnObject = Object.assign({
            visible: true
        })
        dispatch({
            type: FETCH_INSTRUCTOR_DATA,
            payload: returnObject
        });
    }
}

export function clearInstructorData() {
    return dispatch => {
        console.log("Fetch instructor data")
        dispatch({
            type: FETCH_INSTRUCTOR_DATA,
            payload: {
                visible: false
            }
        });
    }
}
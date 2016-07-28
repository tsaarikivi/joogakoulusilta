import {
    FETCH_INSTRUCTOR_DATA,
    INSTRUCTOR_ERROR
} from './actionTypes.js'

export function setInstructorData(course, booking) {
    return dispatch => {
        var returnObject = {}
        returnObject = Object.assign({
            visible: true,
            course,
            booking: booking.all
        })
        dispatch({
            type: FETCH_INSTRUCTOR_DATA,
            payload: returnObject
        });
    }
}

export function clearInstructorData() {
    return dispatch => {
        dispatch({
            type: FETCH_INSTRUCTOR_DATA,
            payload: {
                visible: false,
                course: {},
                booking: []
            }
        });
    }
}
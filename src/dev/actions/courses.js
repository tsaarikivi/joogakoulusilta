import {
    FETCH_TIMETABLE,
    PUT_COURSE_INFO,
    REMOVE_COURSE_INFO,
} from './actionTypes.js'

const CoursesRef = firebase.database().ref('/courses/')

export function fetchTimetable(instructor = "all") {
    var list = Object.assign([])
    return dispatch => {
        CoursesRef.once('value', snapshot => {
            var courses = snapshot.val()
            for (var key in courses) {
                if (instructor === "all" || courses[key].instructor.key === instructor) {
                    courses[key].key = key
                    list = list.concat(courses[key])
                }
            }
            list.sort(function(a, b) {
                if (a.start && b.start) {
                    return a.start - b.start
                }
                return 0
            })
            dispatch({
                type: FETCH_TIMETABLE,
                payload: {
                    courses: list
                }
            })
        })
    }
}

export function putCourseInfo(course, booking) {
    return dispatch => {
        dispatch({
            type: PUT_COURSE_INFO,
            payload: course
        });
        dispatch({
            type: PUT_COURSE_INFO,
            payload: {
                bookings: booking
            }
        });
    }
}

export function removeCourseInfo() {
    return {
        type: REMOVE_COURSE_INFO
    }
}
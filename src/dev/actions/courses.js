import {
    FETCH_TIMETABLE,
    PUT_COURSE_INFO,
    REMOVE_COURSE_INFO,
} from './actionTypes.js'

import {
    hasTimePassed,
    getCourseTimeLocal
} from '../helpers/timeHelper.js'

function processCancel(course, cancelledCourse){
    let weekIndex = (hasTimePassed(course.day, course.start))? 1 : 0;
    let instance = getCourseTimeLocal(weekIndex, course.start, course.day)
    if(cancelledCourse[instance.getTime()]){
        course.cancelInfo = cancelledCourse[instance.getTime()];
        course.cancelled = true;
    }
}

export function fetchTimetable(instructor = "all") {
    var list = Object.assign([])
    var cancelled = {}
    return dispatch => {
        firebase.database().ref('/cancelledCourses/').once('value')
        .then(snapshot => {
            cancelled = snapshot.val()
            return firebase.database().ref('/courses/').once('value');
        })
        .then( snapshot => {
            var courses = snapshot.val()
            for (var key in courses) {
                if (instructor === "all" || courses[key].instructor.key === instructor) {
                    courses[key].key = key
                    courses[key].cancelled = false; //This will be overwritten in processCancel if called
                    if(cancelled){
                        if(cancelled[key]){
                            processCancel(courses[key], cancelled[key]);
                        }
                    }
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
        .catch(error => {
            console.error("FetchTimetable failed:", error);
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
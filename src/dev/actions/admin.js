import {
    FETCH_USER_LIST,
    FETCH_ADMIN_LIST,
    FETCH_COURSE_TYPE_LIST,
    FETCH_COURSE_LIST,
    FETCH_INSTRUCTOR_LIST,
    FETCH_SHOP_LIST,
    FETCH_PLACE_LIST,
    FETCH_INFO_LIST,

    EXPAND_ADMIN_LIST,
    MINIMIZE_ADMIN_LIST,
    EXPAND_USER_LIST,
    MINIMIZE_USER_LIST,
    EXPAND_COURSE_TYPE_LIST,
    MINIMIZE_COURSE_TYPE_LIST,
    EXPAND_COURSE_LIST,
    MINIMIZE_COURSE_LIST,
    EXPAND_INSTRUCTOR_LIST,
    MINIMIZE_INSTRUCTOR_LIST,
    EXPAND_SHOP_LIST,
    MINIMIZE_SHOP_LIST,
    EXPAND_PLACE_LIST,
    MINIMIZE_PLACE_LIST,
    EXPAND_INFO_LIST,
    MINIMIZE_INFO_LIST,

    EXPAND_PLACE_FORM,
    MINIMIZE_PLACE_FORM,
    EXPAND_COURSE_TYPE_FORM,
    MINIMIZE_COURSE_TYPE_FORM,
    EXPAND_COURSE_FORM,
    MINIMIZE_COURSE_FORM,
    EXPAND_SPECIAL_COURSE_FORM,
    MINIMIZE_SPECIAL_COURSE_FORM,
    EXPAND_TIME_SHOP_FORM,
    MINIMIZE_TIME_SHOP_FORM,
    EXPAND_COUNT_SHOP_FORM,
    MINIMIZE_COUNT_SHOP_FORM,
    EXPAND_INFO_FORM,
    MINIMIZE_INFO_FORM
} from './actionTypes.js'
import {
    toMilliseconds
} from '../helpers/timeHelper.js'


export function fetchUserList() {
    var list = Object.assign([])
    return dispatch => {
        firebase.database().ref('/users/').once('value', snapshot => {
                var users = snapshot.val()
                for (var key in users) {
                    if (users.hasOwnProperty(key) && !users[key].instructor) {
                        let ItemWithKey = users[key]
                        ItemWithKey.key = key
                        list = list.concat(ItemWithKey)
                    }
                }
                list.sort(function(a, b) {
                    let nma = a.firstname.toUpperCase()
                    let nmb = b.firstname.toUpperCase()
                    if (nma < nmb) {
                        return -1
                    }
                    if (nma > nmb) {
                        return 1
                    }
                    return 0
                })
                dispatch({
                    type: FETCH_USER_LIST,
                    payload: list
                })
            })
            .catch(err => {
                console.error("ADMIN_ERR: fetch users fetchUserList: ", err);
            })
    }
}

export function fetchAdminList() {
    var list = Object.assign([])
    var specialusers = Object.assign({})
    var users = Object.assign({})

    return dispatch => {
        firebase.database().ref('/users/').once('value')
            .then(snapshot => {
                users = snapshot.val()
                return firebase.database().ref('/specialUsers/').once('value')
            })
            .then(snapshot => {
                specialusers = snapshot.val()

                for (var key in specialusers) {
                    if (specialusers[key].admin) {
                        users[key].key = key
                        list = list.concat(users[key])
                    }
                }
                list.sort(function(a, b) {
                    let nma = a.firstname.toUpperCase()
                    let nmb = b.firstname.toUpperCase()
                    if (nma < nmb) {
                        return -1
                    }
                    if (nma > nmb) {
                        return 1
                    }
                    return 0
                })
                dispatch({
                    type: FETCH_ADMIN_LIST,
                    payload: list
                })

            })
            .catch(err => {
                console.error("FETCH USERS ERROR: ", err);
            })
    }
}

export function fetchInstructorList() {
    var list = Object.assign([])
    var specialusers = Object.assign({})
    var users = Object.assign({})

    return dispatch => {
        firebase.database().ref('/users/').once('value')
            .then(snapshot => {
                users = snapshot.val()
                return firebase.database().ref('/specialUsers/').once('value')
            })
            .then(snapshot => {
                specialusers = snapshot.val()

                for (var key in specialusers) {
                    if (specialusers[key].instructor) {
                        users[key].key = key
                        list = list.concat(users[key])
                    }
                }
                list.sort(function(a, b) {
                    let nma = a.firstname.toUpperCase()
                    let nmb = b.firstname.toUpperCase()
                    if (nma < nmb) {
                        return -1
                    }
                    if (nma > nmb) {
                        return 1
                    }
                    return 0
                })
                dispatch({
                    type: FETCH_INSTRUCTOR_LIST,
                    payload: list
                })

            })
            .catch(err => {
                console.error("FETCH USERS ERROR: ", err);
            })
    }
}

export function stopFetchCourseTypeList() {
    return dispatch => {
        firebase.database().ref('/courseTypes/').off('value');
        dispatch({
            type: FETCH_COURSE_TYPE_LIST,
            payload: {
                list: Object.assign([])
            }
        });
    }
}
export function fetchCourseTypeList() {
    var list = []
    var returnObject = {}
    return dispatch => {
        firebase.database().ref('/courseTypes/').on('value', snapshot => {
            var courseTypes = snapshot.val()
            list = Object.assign([])
            for (var key in courseTypes) {
                if (courseTypes.hasOwnProperty(key)) {
                    let ItemWithKey = courseTypes[key]
                    ItemWithKey.key = key
                    list = list.concat(ItemWithKey)
                }
            }
            list.sort(function(a, b) {
                let nma = a.name.toUpperCase()
                let nmb = b.name.toUpperCase()
                if (nma < nmb) {
                    return -1
                }
                if (nma > nmb) {
                    return 1
                }
                return 0
            })
            returnObject = Object.assign({}, {
                list: list
            })
            dispatch({
                type: FETCH_COURSE_TYPE_LIST,
                payload: returnObject
            })
        }, err => {
            console.error("ERR: fetch courseTypes: ", err);
        })
    }
}

export function stopFetchCourseList() {
    return dispatch => {
        firebase.database().ref('/courses/').off('value');
        dispatch({
            type: FETCH_COURSE_LIST,
            payload: {
                list: []
            }
        });
    }
}

export function fetchCourseList() {
    var list = []
    var returnObject = {}
    return dispatch => {
        firebase.database().ref('/courses/').on('value', snapshot => {
            var courses = snapshot.val()
            list = Object.assign([])
            for (var key in courses) {
                if (courses.hasOwnProperty(key)) {
                    let ItemWithKey = courses[key]
                    ItemWithKey.key = key
                    list = list.concat(ItemWithKey)
                }
            }
            list.sort(function(a, b) {
                if (a.day && b.day) {
                    return a.day - b.day
                }
                return 1
            })
            returnObject = Object.assign({}, {
                list: list
            })
            dispatch({
                type: FETCH_COURSE_LIST,
                payload: returnObject
            })
        }, err => {
            console.error("ERR: fetch courses: ", err);
        })
    }
}

export function fetchShopList() {
    var list = Object.assign([])
    return dispatch => {
        firebase.database().ref('/shopItems/').once('value', snapshot => {
                var shopItems = snapshot.val()
                for (var key in shopItems) {
                    if (shopItems.hasOwnProperty(key)) {
                        let ItemWithKey = shopItems[key]
                        ItemWithKey.key = key
                        list = list.concat(ItemWithKey)
                    }
                }
                list.sort(function(a, b) {
                    if (a.price && b.price) {
                        return a.price - b.price
                    }
                    return 0
                })
                dispatch({
                    type: FETCH_SHOP_LIST,
                    payload: list
                })
            })
            .catch(err => {
                console.error("ERR: fetch shopItems: ", err);
            })
    }
}

export function stopFetchPlaceList() {
    return dispatch => {
        firebase.database().ref('/places').off('value');
        dispatch({
            type: FETCH_PLACE_LIST,
            payload: {
                list: Object.assign([])
            }
        });
    }
}

export function fetchPlaceList() {
    var list = []
    var returnObject = {}
    return dispatch => {
        firebase.database().ref('/places/').on('value', snapshot => {
            var places = snapshot.val()
            list = Object.assign([])
            for (var key in places) {
                if (places.hasOwnProperty(key)) {
                    let ItemWithKey = places[key]
                    ItemWithKey.key = key
                    list = list.concat(ItemWithKey)
                }
            }
            list.sort(function(a, b) {
                let nma = a.name.toUpperCase()
                let nmb = b.name.toUpperCase()
                if (nma < nmb) {
                    return -1
                }
                if (nma > nmb) {
                    return 1
                }
                return 0
            })
            returnObject = Object.assign({}, {
                list: list
            })
            dispatch({
                type: FETCH_PLACE_LIST,
                payload: returnObject
            })
        }, err => {
            console.error("ERR: fetch places: ", err);
        })
    }
}


export function fetchInfoList() {
    var list = []

    return dispatch => {
        var returnObject = {}
        firebase.database().ref('/infoItems/').on('value', snapshot => {
            var infoItems = snapshot.val()
            list = Object.assign([])
            for (var key in infoItems) {
                if (infoItems.hasOwnProperty(key)) {
                    let ItemWithKey = infoItems[key]
                    ItemWithKey.key = key
                    list = list.concat(ItemWithKey)
                }
            }
            returnObject = Object.assign({}, {
                list: list
            })
            dispatch({
                type: FETCH_INFO_LIST,
                payload: returnObject
            })
        }, err => {
            console.error("ERR: fetch infoItems: ", err);
        })
    }
}

export function stopFetchInfoList() {
    return dispatch => {
        firebase.database().ref('/infoItems/').off('value');
        dispatch({
            type: FETCH_INFO_LIST,
            payload: {
                list: Object.assign([])
            }
        })
    }
}

export function removeInfoItem(item) {
    return dispatch => {
        firebase.database().ref('/infoItems/' + item.key).remove().then(() => {

        }).catch(err => {
            console.error("Removing info item falied: ", err)
        })
    }
}

export function removePlaceItem(item) {
    return dispatch => {
        firebase.database().ref('/places/' + item.key).remove().then(() => {

        }).catch(err => {
            console.error("Removing place item falied: ", err)
        })
    }
}

export function addPlace(data) {
    return dispatch => firebase.database().ref('/places/' + data.name).update({
            name: data.name,
            desc: data.desc,
            address: data.address
        })
        .catch(err => {
            console.error("ERR: update; addPlace: ", err);
        })
}

export function modifyPlace(data) {
    return dispatch => firebase.database().ref('/places/' + data.name).update({
            name: data.name,
            desc: data.desc,
            address: data.address
        })
        .catch(err => {
            console.error("ERR: update; UpdatePlace: ", err);
        })
}



export function removeCourse(key) {
    return dispatch => {
        firebase.database().ref('/courses/' + key).remove().then(() => {

        }).catch(err => {
            console.error("Removing course failed: ", err)
        })
    }
}

export function addCourse(data, courseType, place, instructor) {

    return dispatch => {
        firebase.database().ref('/courses/').push({
            start: toMilliseconds(parseInt(data.start)),
            end: toMilliseconds(parseInt(data.end)),
            maxCapacity: parseInt(data.maxCapacity),
            day: parseInt(data.day),
            place: place,
            instructor: instructor,
            courseType: courseType
        })
    }
}

export function modifyCourse(data, key, courseType, place, instructor) {
    return dispatch => {
        firebase.database().ref('/courses/' + key).update({
            start: toMilliseconds(parseInt(data.start)),
            end: toMilliseconds(parseInt(data.end)),
            maxCapacity: parseInt(data.maxCapacity),
            day: parseInt(data.day),
            place: place,
            instructor: instructor,
            courseType: courseType
        })
    }
}

export function addSpecialCourse(data) {
    var courseType = Object.assign({})
    var instructor = Object.assign({})
    var place = Object.assign({})
        //TODO: Noi places, users, coursetypes vois lähettää kutsuvasta funktiosta, kun ne on siellä staten osana

    return dispatch => {
        firebase.database().ref('/places/' + data.place).once("value")
            .then(snapshot => {
                place = snapshot.val()
                return firebase.database().ref('/users/' + data.instructor).once("value")
            })
            .then(snapshot => {
                instructor = snapshot.val()
                return firebase.database().ref('/courseTypes/' + data.courseType).once("value")
            })
            .then(snapshot => {
                courseType = snapshot.val()
                instructor.uid = null

                const beforetax = data.price / (1 + (data.taxpercent / 100))
                const taxamount = data.price - beforetax

                firebase.database().ref('/specialCourses/').push({
                    start: data.date + toMilliseconds(parseInt(data.start)),
                    end: data.date + toMilliseconds(parseInt(data.end)),
                    maxCapacity: parseInt(data.maxCapacity),
                    date: data.date + toMilliseconds(parseInt(data.start)),
                    price: Number(data.price.toFixed(2)),
                    taxpercent: Number(data.taxpercent.toFixed(2)),
                    taxamount: Number(taxamount.toFixed(2)),
                    beforetax: Number(beforetax.toFixed(2)),
                    place: place,
                    instructor: instructor,
                    courseType: courseType,
                    type: "special",
                    title: data.title
                })
            })
    }
}

export function addCourseType(data) {
    return dispatch => firebase.database().ref('/courseTypes/' + data.name).update({
            name: data.name,
            desc: data.desc
        })
        .catch(err => {
            console.error("ERR: update; addCourseType: ", err);
        })
}

export function removeCourseType(item) {
    return dispatch => {
        firebase.database().ref('/courseTypes/' + item.name).remove().then(() => {

        }).catch(err => {
            console.error("Removing place item failed: ", err)
        })
    }
}


export function modifyCourseType(data) {
    return dispatch => firebase.database().ref('/courseTypes/' + data.name).update({
            name: data.name,
            desc: data.desc
        })
        .catch(err => {
            console.error("ERR: update; modifyCourseType: ", err);
        })
}


export function addShopItem(data, type) {
    const beforetax = data.price / (1 + (data.taxpercent / 100))
    const taxamount = data.price - beforetax

    return dispatch => firebase.database().ref('/shopItems/' + data.title).update({
            type: type,
            title: data.title,
            desc: data.desc,
            usetimes: data.usetimes || null,
            usedays: data.usedays || null,
            expiresAfterDays: data.expiresAfterDays || null,
            price: Number(data.price.toFixed(2)),
            taxamount: Number(taxamount.toFixed(2)),
            taxpercent: Number(data.taxpercent.toFixed(2)),
            beforetax: Number(beforetax.toFixed(2)),
        })
        .catch(err => {
            console.error("ERR: update; addShopItem: ", err);
        })
}

export function addInfo(data) {
    return dispatch => firebase.database().ref('/infoItems/').push({
            title: data.title,
            content: data.content
        })
        .catch(err => {
            console.error("ERR: addInfo: ", err);
        })
}

export function modifyInfo(key, data) {
    return dispatch => firebase.database().ref('/infoItems/' + key).update({
            title: data.title,
            content: data.content
        })
        .catch(err => {
            console.error("ERR: modifyInfo: ", err);
        })
}


export function lockUser(key) {
    return dispatch => firebase.database().ref('/users/' + key).update({
            locked: true,
            instructor: null
        })
        .catch(err => {
            console.error("ERR: update; lockUser: ", err);
        })
}

export function unlockUser(key) {
    return dispatch => firebase.database().ref('/users/' + key).update({
            locked: null
        })
        .catch(err => {
            console.error("ERR: update; unlockUser: ", err);
        })
}

export function lockShopItem(key) {
    return dispatch => firebase.database().ref('/shopItems/' + key).update({
            locked: true
        })
        .catch(err => {
            console.error("ERR: update; lockShopItem: ", err);
        })
}

export function unlockShopItem(key) {
    return dispatch => firebase.database().ref('/shopItems/' + key).update({
            locked: null
        })
        .catch(err => {
            console.error("ERR: update; unlockShopItem: ", err);
        })
}

export function makeInstructor(key) {
    return dispatch => firebase.database().ref('/specialUsers/' + key).update({
            instructor: true
        })
        .catch(err => {
            console.error("ERR: update; makeInstructor: ", err);
        })
}

export function unmakeInstructor(key) {
    return dispatch => firebase.database().ref('/specialUsers/' + key).update({
            instructor: null
        })
        .catch(err => {
            console.error("ERR: update; unmakeInstructor: ", err);
        })
}

export function expandAdminList() {
    return dispatch => {
        dispatch({
            type: EXPAND_ADMIN_LIST
        })
    }
}

export function minimizeAdminList() {
    return dispatch => {
        dispatch({
            type: MINIMIZE_ADMIN_LIST
        })
    }
}

export function expandUserList() {
    return dispatch => {
        dispatch({
            type: EXPAND_USER_LIST
        })
    }
}

export function minimizeUserList() {
    return dispatch => {
        dispatch({
            type: MINIMIZE_USER_LIST
        })
    }
}

export function expandCourseTypeList() {
    return dispatch => {
        dispatch({
            type: EXPAND_COURSE_TYPE_LIST
        })
    }
}

export function minimizeCourseTypeList() {
    return dispatch => {
        dispatch({
            type: MINIMIZE_COURSE_TYPE_LIST
        })
    }
}

export function expandCourseList() {
    return dispatch => {
        dispatch({
            type: EXPAND_COURSE_LIST
        })
    }
}

export function minimizeCourseList() {
    return dispatch => {
        dispatch({
            type: MINIMIZE_COURSE_LIST
        })
    }
}

export function expandInstructorList() {
    return dispatch => {
        dispatch({
            type: EXPAND_INSTRUCTOR_LIST
        })
    }
}

export function minimizeInstructorList() {
    return dispatch => {
        dispatch({
            type: MINIMIZE_INSTRUCTOR_LIST
        })
    }
}

export function expandShopList() {
    return dispatch => {
        dispatch({
            type: EXPAND_SHOP_LIST
        })
    }
}

export function minimizeShopList() {
    return dispatch => {
        dispatch({
            type: MINIMIZE_SHOP_LIST
        })
    }
}

export function expandPlaceList() {
    return dispatch => {
        dispatch({
            type: EXPAND_PLACE_LIST
        })
    }
}

export function minimizePlaceList() {
    return dispatch => {
        dispatch({
            type: MINIMIZE_PLACE_LIST
        })
    }
}

export function expandPlaceForm(expander) {
    return dispatch => {
        dispatch({
            type: EXPAND_PLACE_FORM,
            payload: {
                expanded: true,
                expander: expander
            }
        })
    }
}

export function minimizePlaceForm() {
    return dispatch => {
        dispatch({
            type: MINIMIZE_PLACE_FORM,
            payload: {
                expanded: false,
                expander: ""
            }
        })
    }
}

export function expandCourseTypeForm(expander) {
    return dispatch => {
        dispatch({
            type: EXPAND_COURSE_TYPE_FORM,
            payload: {
                expanded: true,
                expander: expander
            }
        })
    }
}

export function minimizeCourseTypeForm() {
    return dispatch => {
        dispatch({
            type: MINIMIZE_COURSE_TYPE_FORM,
            payload: {
                expanded: false,
                expander: ""
            }
        })
    }
}

export function expandCourseForm(expander) {
    return dispatch => {
        dispatch({
            type: EXPAND_COURSE_FORM,
            payload: {
                expanded: true,
                expander: expander
            }
        })
    }
}

export function minimizeCourseForm() {
    return dispatch => {
        dispatch({
            type: MINIMIZE_COURSE_FORM,
            payload: {
                expanded: false,
                expander: ""
            }
        })
    }
}

export function expandSpecialCourseForm() {
    return dispatch => {
        dispatch({
            type: EXPAND_SPECIAL_COURSE_FORM
        })
    }
}

export function minimizeSpecialCourseForm() {
    return dispatch => {
        dispatch({
            type: MINIMIZE_SPECIAL_COURSE_FORM
        })
    }
}

export function expandTimeShopForm() {
    return dispatch => {
        dispatch({
            type: EXPAND_TIME_SHOP_FORM
        })
    }
}

export function minimizeTimeShopForm() {
    return dispatch => {
        dispatch({
            type: MINIMIZE_TIME_SHOP_FORM
        })
    }
}

export function expandCountShopForm() {
    return dispatch => {
        dispatch({
            type: EXPAND_COUNT_SHOP_FORM
        })
    }
}

export function minimizeCountShopForm() {
    return dispatch => {
        dispatch({
            type: MINIMIZE_COUNT_SHOP_FORM
        })
    }
}

export function expandInfoList() {
    return dispatch => {
        dispatch({
            type: EXPAND_INFO_LIST
        })
    }
}

export function minimizeInfoList() {
    return dispatch => {
        dispatch({
            type: MINIMIZE_INFO_LIST
        })
    }
}

export function expandInfoForm(expander) {
    return dispatch => {
        dispatch({
            type: EXPAND_INFO_FORM,
            payload: {
                expanded: true,
                expander: expander
            }
        })
    }
}

export function minimizeInfoForm() {
    return dispatch => {
        dispatch({
            type: MINIMIZE_INFO_FORM,
            payload: {
                expanded: false,
                expander: ""
            }
        })
    }
}

/*export function updateToFirebase(
  refName,
  key = firebase.database().ref().child(refName).push().key,
  ...items)
  {
    return dispatch => firebase.database().ref(refName).push({
      items.reduce((prev, item) => {
        return Object.assign({}, prev, item)
      }, {})
  })
  .catch(err => {
      console.error("ERR: pushToFirebase() ", err);
  })
}*/
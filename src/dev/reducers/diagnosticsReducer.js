import * as actions from '../actions/actionTypes.js'

const INITIAL_STATE = {
    sessionKey: "0",
    started: false,
    user: "0",
    events: {},
    flushed: false
}

//Add events to be discarded here
var approvedEvents = {
    CONFIGURE_DIAGNOSTICS: false,
    FLUSH_DIAGNOSTICS: false,
    GET_CLIENT_TOKEN: false,
    DO_PURCHASE_TRANSACTION: false,
    CHECKOUT_ERROR: false,
    CHECKOUT_TIMEOUT: false,
    START_CHECKOUT_FLOW: false,
    BUY_WITH_CASH: false,
    BUY_WITH_PAYTRAIL: false,
    EXECUTE_CASH_PURCHASE: false,
    FETCH_PENDING_TRANSACTIONS: false,
    FETCH_TERMS: false,
    FETCH_SHOP_ITEMS: false,
    RESET_SHOP: false,
    FETCH_TIMETABLE_BOOKINGS: false,
    FETCH_TIMETABLE: false,
    FETCH_SPECIAL_COURSES: false,
    FETCH_SPECIAL_COURSES_BANNER: false,
    FETCH_SPECIAL_COURSES_BOOKINGS: false,
    PUT_SPECIAL_COURSE_INFO: false,
    REMOVE_SPECIAL_COURSE_INFO: false,
    ADD_TO_CART: false,
    CHANGE_LOADINGSCREEN_STATE: false,
    ADD_USER: false,
    REMOVE_USER: false,
    AUTH_ERROR: false,
    AUTH_TIMEOUT: false,
    PASSWORD_UPDATED: false,
    EMAIL_UPDATED: false,
    PASSWORD_RESET: false,
    USER_DETAILS_UPDATED_IN_DB: false,
    STOP_UPDATING_USER_DETAILS_FROM_DB: false,
    USER_ERROR: false,
    UPDATE_USERS_TRANSACTIONS: false,
    UPDATE_USERS_BOOKINGS: false,
    UPDATE_USERS_SCBOOKINGS: false,
    FETCH_PLACE_INFO: false,
    FETCH_INSTRUCTOR_DATA: false,
    INSTRUCTOR_ERROR: false,
    FETCH_INSTRUCTOR_INFO: false,
    PUT_COURSE_INFO: false,
    FETCH_COURSE_BOOKINGS: false,
    REMOVE_COURSE_INFO: false,
    FETCH_USER_LIST: false,
    FETCH_ADMIN_LIST: false,
    FETCH_COURSE_TYPE_LIST: false,
    FETCH_COURSE_LIST: false,
    FETCH_SPECIAL_COURSE_LIST: false,
    FETCH_INSTRUCTOR_LIST: false,
    FETCH_SHOP_LIST: false,
    FETCH_PLACE_LIST: false,
    FETCH_TERMS_LIST: false,
    STOP_FETCH_TERMS_LIST: false,
    FETCH_INFO_LIST: false,
    STOP_FETCH_INFO_LIST: false,
    STOP_FETCH_SHOP_LIST: false,
    EXPAND_ADMIN_LIST: false,
    MINIMIZE_ADMIN_LIST: false,
    EXPAND_USER_LIST: false,
    MINIMIZE_USER_LIST: false,
    EXPAND_COURSE_TYPE_LIST: false,
    MINIMIZE_COURSE_TYPE_LIST: false,
    EXPAND_COURSE_LIST: false,
    MINIMIZE_COURSE_LIST: false,
    EXPAND_INSTRUCTOR_LIST: false,
    MINIMIZE_INSTRUCTOR_LIST: false,
    EXPAND_SHOP_LIST: false,
    MINIMIZE_SHOP_LIST: false,
    EXPAND_PLACE_LIST: false,
    MINIMIZE_PLACE_LIST: false,
    EXPAND_SPECIAL_COURSE_LIST: false,
    MINIMIZE_SPECIAL_COURSE_LIST: false,
    EXPAND_PLACE_FORM: false,
    MINIMIZE_PLACE_FORM: false,
    EXPAND_COURSE_TYPE_FORM: false,
    MINIMIZE_COURSE_TYPE_FORM: false,
    EXPAND_COURSE_FORM: false,
    MINIMIZE_COURSE_FORM: false,
    EXPAND_SPECIAL_COURSE_FORM: false,
    MINIMIZE_SPECIAL_COURSE_FORM: false,
    EXPAND_TIME_SHOP_FORM: false,
    MINIMIZE_TIME_SHOP_FORM: false,
    EXPAND_COUNT_SHOP_FORM: false,
    MINIMIZE_COUNT_SHOP_FORM: false,
    EXPAND_INFO_LIST: false,
    MINIMIZE_INFO_LIST: false,
    EXPAND_INFO_FORM: false,
	MINIMIZE_INFO_FORM: false,
	EXPAND_TERMS_LIST: false,
	MINIMIZE_TERMS_LIST: false,
	EXPAND_TERMS_FORM: false,
	MINIMIZE_TERMS_FORM: false,
    CHANGE_SEARCH_BAR: false,
}

export default function(state = INITIAL_STATE, action) {

    switch (action.type) {
        case actions.CONFIGURE_DIAGNOSTICS:
            return Object.assign({},state, action.payload)
        case actions.FLUSH_DIAGNOSTICS:
            if(state.started && state.sessionKey !== "0"){
                firebase.database().ref('/diagnostics/'+state.sessionKey).update({user: state.user})
                .catch(error => {
                    console.error("diagnostics user write to firebase failed");
                })
                for(let event in state.events){
                    let instances = state.events[event];
                    for(let timestamp in instances){
                        firebase.database().ref('/diagnostics/'+state.sessionKey+'/events/'+event+'/'+timestamp).update(instances[timestamp]||{payload: 0})
                        .catch(error => {
                            console.error("flushing diagnostics events to firebase failed");
                        })                
                    }
                }
            }
            return Object.assign({}, state, {events: {}})
        default:
            if(state.started){
                //Filter only the actions we know of.
                if(actions[action.type]){
                    return Object.assign({}, state, processAction(state, action))
                }
            }
            return state
    }
}

function processAction(state, action){
    let timestamp = Date.now();
    let returnObject = Object.assign({})
    let eventObject = Object.assign({})
    /////////
    if(action.type === actions.ADD_USER && state.user === "0"){
        returnObject = Object.assign({},returnObject, { user: action.payload.uid})
        return returnObject;
    }
    /////////
    // Here we can filter only those events, which we are interested in
    /////////
    if(approvedEvents[action.type]){
        let list = {}
        let events = state.events;
        if(events[action.type]){
            list = Object.assign(events[action.type], {[timestamp]: action.payload});
        } else {
            list = Object.assign({[timestamp]: action.payload});
        }
        eventObject = Object.assign({}, events, {[action.type]: list})
        returnObject = Object.assign({}, {events: eventObject})
    }
    if(action.type === actions.ADD_USER) console.log("ADD_USER", action, state, returnObject);
    return returnObject;
}
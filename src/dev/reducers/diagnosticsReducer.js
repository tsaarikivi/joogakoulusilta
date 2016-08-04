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
    CHECKOUT_ERROR: true,
    START_CHECKOUT_FLOW: true,
    BUY_WITH_CASH: true,
    BUY_WITH_PAYTRAIL: true,
    EXECUTE_CASH_PURCHASE: true,
    ADD_TO_CART: true,
    AUTH_ERROR: true,
    PASSWORD_RESET: true,
    USER_ERROR: true,
    INSTRUCTOR_ERROR: true,
    EXPAND_ADMIN_LIST: true,
    MINIMIZE_ADMIN_LIST: true,
    EXPAND_USER_LIST: true,
    MINIMIZE_USER_LIST: true,
    EXPAND_COURSE_TYPE_LIST: true,
    MINIMIZE_COURSE_TYPE_LIST: true,
    EXPAND_COURSE_LIST: true,
    MINIMIZE_COURSE_LIST: true,
    EXPAND_INSTRUCTOR_LIST: true,
    MINIMIZE_INSTRUCTOR_LIST: true,
    EXPAND_SHOP_LIST: true,
    MINIMIZE_SHOP_LIST: true,
    EXPAND_PLACE_LIST: true,
    MINIMIZE_PLACE_LIST: true,
    EXPAND_SPECIAL_COURSE_LIST: true,
    MINIMIZE_SPECIAL_COURSE_LIST: true,
    EXPAND_PLACE_FORM: true,
    MINIMIZE_PLACE_FORM: true,
    EXPAND_COURSE_TYPE_FORM: true,
    MINIMIZE_COURSE_TYPE_FORM: true,
    EXPAND_COURSE_FORM: true,
    MINIMIZE_COURSE_FORM: true,
    EXPAND_SPECIAL_COURSE_FORM: true,
    MINIMIZE_SPECIAL_COURSE_FORM: true,
    EXPAND_TIME_SHOP_FORM: true,
    MINIMIZE_TIME_SHOP_FORM: true,
    EXPAND_COUNT_SHOP_FORM: true,
    MINIMIZE_COUNT_SHOP_FORM: true,
    EXPAND_INFO_LIST: true,
    MINIMIZE_INFO_LIST: true,
    EXPAND_INFO_FORM: true,
	MINIMIZE_INFO_FORM: true,
	EXPAND_TERMS_LIST: true,
	MINIMIZE_TERMS_LIST: true,
	EXPAND_TERMS_FORM: true,
	MINIMIZE_TERMS_FORM: true,
    CHANGE_SEARCH_BAR: true
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
        list = Object.assign(events[action.type], {[timestamp]: action.payload});
        eventObject = Object.assign({}, events, {[action.type]: list})
        returnObject = Object.assign({}, {events: eventObject})
    }
    return returnObject;
}
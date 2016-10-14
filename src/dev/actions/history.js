import { historyTypes as types } from '../actions/actionTypes.js'

function fetchHistory() {
    return dispatch => {
        firebase.database().ref('bookingsbycourse').once('value')
            .then(data => {
                console.log("fetch success")
                dispatch({
                    type: types.FETCH_HISTORY,
                    payload: data.val()
                })
            })
            .catch(error => {
                console.error(error)
            })
    }
}

const actions = {
    fetchHistory
}

export default actions
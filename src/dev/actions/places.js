import { FETCH_PLACE_INFO } from './actionTypes.js'

const PlaceInfoRef = firebase.database().ref('/places/')

export function fetchPlaceInfo() {
  var list = []
  return dispatch => {
    PlaceInfoRef.on('child_added', snapshot => {
      let placeInfoWithKey = snapshot.val()
      placeInfoWithKey.key = snapshot.key
      list = list.concat(placeInfoWithKey)
      dispatch({
        type: FETCH_PLACE_INFO,
        payload: list
      })
    })
  }
}

/*
export function addPlaceInfo(props) {
  return dispatch => PlaceInfoRef.push({
    props.title,
    props.desc
  })
}

export function removePlaceInfo(key) {
  return dispatch => PlaceInfoRef.child(key).remove()
}
*/

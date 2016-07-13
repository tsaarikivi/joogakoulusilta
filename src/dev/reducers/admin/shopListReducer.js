import { FETCH_SHOP_LIST, EXPAND_SHOP_LIST, MINIMIZE_SHOP_LIST } from '../../actions/actionTypes.js'

const INITIAL_STATE = {expanded: false}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SHOP_LIST:
      return Object.assign({}, state, {list: action.payload})
    case EXPAND_SHOP_LIST:
      return Object.assign({}, state, {expanded: true})
    case MINIMIZE_SHOP_LIST:
      return Object.assign({}, state, {expanded: false})
    default:
      return state
  }
}

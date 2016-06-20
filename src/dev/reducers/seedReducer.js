import { SEED } from '../actions/actionTypes.js'

export function seedStore(state = {}, action) {
  switch (action.type) {
    case SEED:
      return Object.assign(action.payload.SEEDDATA);
    default:
      return state
  }
}

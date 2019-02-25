import {LOGIN, LOGOUT} from '../actions/user.js'

const initialState = {
  status: "logged-out",
  firstname: null,
  lastname: null,
  token: null
}

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, {
        status: "logged-in",
        firstname: action.user.firstname,
        lastname: action.user.lastname,
        token: action.token
      })
    case LOGOUT:
    return Object.assign({}, state, {
      status: "logged-out",
      firstname: null,
      lastname: null,
      token: null
    })
    default:
      return state
  }
}

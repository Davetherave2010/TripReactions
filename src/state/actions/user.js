export const LOGIN = 'user/login'
export const LOGOUT = 'user/logout'

export function login(user, token) {
  return {
    type: LOGIN,
    user,
    token
  }
}

export function logout() {
  return {
    type: LOGOUT
  }
}

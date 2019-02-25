import { configureStore } from 'redux-starter-kit'

import {userReducer} from './reducers/user'

const reducer = {
  user: userReducer,
}

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: localStorage.getItem('tripactions-app') !== null ? JSON.parse(localStorage.getItem('tripactions-app')) : {}
})

store.subscribe(() => {
  localStorage.setItem('tripactions-app', JSON.stringify(store.getState()));
})

export default store

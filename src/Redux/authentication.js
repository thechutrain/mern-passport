import axios from 'axios'
import { updateMsg } from './alerts'
/* ======= Action Types =========
*
*/
export const LOCAL_SIGN_IN = 'LOCAL_SIGN_IN'
export const LOCAL_SIGN_UP = 'LOCAL_SIGN_UP'
export const SIGN_OUT = 'SIGN_OUT'

/* ======= Reducer =========
*
*/
const defaultState = {
  loggedIn: false,
  user: {
  }
}

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SIGN_OUT:
      return { ...state, loggedIn: false }
    case LOCAL_SIGN_IN:
      // TODO - change the format of how user is defined here
      return { ...state, user: action.payload.user, loggedIn: true }
    default:
      return state
  }
}

/* ======= Action creators =========
*
*/
// export const signOut = () => ({ type: SIGN_OUT })
export const signOut = () => (dispatch, getState) => {
  // making the axios post to route clearsCookie storing session id
  return axios.post('/auth/logout').then(()=> {
    return dispatch({ type: SIGN_OUT })
  }).then(() => {
    dispatch(updateMsg('Successful sign out', {success:true}, 5))
  }).catch((error) => {
    dispatch(updateMsg('Failed Signin', {error:true}, 5))
  })
}

export const localSignIn = (username, password) => (dispatch, getState) => {
  axios.post('/auth/login', { username, password }).then((response) => {
    // dispatch successful login
    return dispatch({ type: LOCAL_SIGN_IN, payload: { user: response.data.user } })
  }).then(() => {
    return dispatch(updateMsg('Successful Login in', {success: true}, 3))
  })
  .catch((error) => {
    // dispatch failed login 
    dispatch(updateMsg('Error - failed login', {error:true}, 5))
    // TODO - update with alerts.js redux file
    // dispatch({ type: FLASH_MSG, payload: { flashMsg: { error: true, displayMsg: true, msg: `raw error msg ... ${error}` } } })
  })
}

export const localSignUp = (username, password, optParams = {}) => (dispatch, getState) => {
  axios.post('/auth/signup', {username, password}).then((response) => {
    if (response.data.error){
      throw new Error(response.data.error)
    }
    console.log('no error ...')
  }).catch((error) => {
    // console.log(error)
    dispatch(updateMsg(`${error}`, {error:true}, 5))
  })
}

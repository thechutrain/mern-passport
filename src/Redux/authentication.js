import axios from 'axios'
import { updateMsg } from './alerts'
/* ======= Action Types =========
*
*/
export const LOCAL_SIGN_IN = 'LOCAL_SIGN_IN'
export const LOCAL_SIGN_UP = 'LOCAL_SIGN_UP'
// export const FLASH_MSG = 'FLASH_MSG'
// export const FLASH_MSG_ERROR = 'FLASH_MSG_ERROR'
// export const FLASH_MSG_SUCCESS = 'FLASH_MSG_SUCCESS'
export const SIGN_OUT = 'SIGN_OUT'

/* ======= Reducer =========
*
*/
const defaultState = {
  loggedIn: false,
  user: {
  },
  // for updating to the user that they've signed in or not
  // flashMsg: {
  //   error: false,
  //   displayMsg: false,
  //   msg: '',
  // }
}

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SIGN_OUT:
      return { ...state, loggedIn: false }
    case LOCAL_SIGN_IN:
      // TODO - change the format of how user is defined here
      return { ...state, user: action.payload.user, loggedIn: true }
    // case LOCAL_REGISTER:
    //   return 
    // case FLASH_MSG:
    //   return { ...state, flashMsg: { ...state.flashMsg, ...action.payload.flashMsg } }
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
    // throw new Error('yep')
    dispatch({ type: SIGN_OUT })
    dispatch(updateMsg('Successful signin', {success:true}, 5))
  }).catch((error) => {
    // TODO - update with alerts.js redux file
    dispatch(updateMsg('Failed Signin', {error:true}, 5))
    // dispatch({ type: FLASH_MSG, payload: { flashMsg: { error: true, displayMsg: true, msg: `raw error msg ... ${error}` } } })
  })
}

export const localSignIn = (username, password) => (dispatch, getState) => {
  axios.post('/auth/login', { username, password }).then((response) => {
    // dispatch successful login
    console.log('SUCEESSFUL login')
    dispatch({ type: LOCAL_SIGN_IN, payload: { user: response.data.user } })
  }).then(() => {
    console.log('about to dispatch flash message')
    // throw new Error('something went wrong hahahhaha')
    // debugger
    // TODO - update with alerts.js redux file
    // dispatch({ type: FLASH_MSG, payload: { flashMsg: { error: false, displayMsg: true, msg: 'You have successfully signed in :)' } } })
  })
  .catch((error) => {
    // dispatch failed login 
    console.log('ERROR IN THE REQUESR???')
    console.log(error)
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
    console.log('error')
    // TODO - update with alerts.js redux file
    // dispatch({ type: FLASH_MSG, payload: { flashMsg: {error: true, displayMsg: true, msg:  `raw error msg ... ${error}`}}})
  })
}

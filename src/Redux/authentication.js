/* ======= Action Types =========
*
*/
export const LOCAL_SIGN_IN = 'LOCAL_SIGN_IN'
export const SIGN_OUT = 'SIGN_OUT'

/* ======= Reducer =========
*
*/
const defaultState = {
  loggedIn: true,
  user: {
  }
}
export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SIGN_OUT:
      return { ...state, loggedIn: false }
    default:
      return state
  }
}

/* ======= Action creators =========
*
*/
export const signOut = () => ({ type: SIGN_OUT })
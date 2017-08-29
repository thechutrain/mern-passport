/* ======= Action Types =========
*
*/
export const SHOW_MSG = 'SHOW_MSG'


/* ======= Reducer =========
*
*/
const defaultState = {
  error: false,
  displayMsg: false,
  msg: ''
}

export default function reducer(state=defaultState, action){
  switch(action.type){
    case SHOW_MSG:
      return {...state, displayMsg: true}
    default:
      return state
  }
}

/* ======= Action creators =========
*
*/
export const showMsg = () => ({ type: SHOW_MSG})
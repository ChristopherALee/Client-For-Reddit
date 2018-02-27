import { RECEIVE_ACCESS_TOKEN } from "../actions/reddit_api_actions";

const sessionReducer = (state = {}, action) => {
  let newState;
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_ACCESS_TOKEN:
      newState = Object.assign({}, state, { token: action.token });
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;

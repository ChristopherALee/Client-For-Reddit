import { RECEIVE_SUBREDDITS } from "../../actions/reddit_api_actions";

const topicsReducer = (state = {}, action) => {
  let newState;
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_SUBREDDITS:
      newState = Object.assign({}, state, {
        [action.topic]: action.subReddits
      });
      return newState;
    default:
      return state;
  }
};

export default topicsReducer;

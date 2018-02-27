import {
  RECEIVE_SUBREDDITS,
  RECEIVE_SUBREDDIT_ABOUT
} from "../../actions/reddit_api_actions";

const subRedditReducer = (state = {}, action) => {
  let newState;
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_SUBREDDIT_ABOUT:
      newState = Object.assign({}, state, {
        [action.subReddit]: action.points
      });
      return newState;
    default:
      return state;
  }
};

export default subRedditReducer;

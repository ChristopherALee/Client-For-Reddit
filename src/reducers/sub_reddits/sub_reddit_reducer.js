import {
  RECEIVE_SUBREDDITS,
  RECEIVE_SUBREDDIT_ABOUT,
  RECEIVE_SUBREDDIT_POSTS
} from "../../actions/reddit_api_actions";

const subRedditReducer = (state = {}, action) => {
  let newState;
  let subReddit;
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_SUBREDDIT_POSTS:
      newState = Object.assign({}, state, {
        [action.subReddit]: {
          ["posts"]: action.posts,
          ["points"]: action.points
        }
      });
      return newState;
    case RECEIVE_SUBREDDIT_ABOUT:
      newState = Object.assign({}, state);
      if (newState[action.subReddit]) {
        subReddit = newState[action.subReddit];
        subReddit["about"] = action.about;
        newState = Object.assign({}, state, { [action.subReddit]: subReddit });
      } else {
        newState = Object.assign({}, state, {
          [action.subReddit]: { ["about"]: action.about.data }
        });
      }

      return newState;
    default:
      return state;
  }
};

export default subRedditReducer;

import * as RedditApiUtil from "../util/reddit_api_util";

export const RECEIVE_ACCESS_TOKEN = "RECEIVE_ACCESS_TOKEN";
export const RECEIVE_SUBREDDITS = "RECEIVE_SUBREDDITS";

const receiveAccessToken = token => {
  return {
    type: RECEIVE_ACCESS_TOKEN,
    token
  };
};

const receiveSubReddits = subReddits => {
  return {
    type: RECEIVE_SUBREDDITS,
    subReddits
  };
};

export const fetchRedditAccessToken = () => dispatch => {
  return RedditApiUtil.redditAPI().then(data => {
    dispatch(receiveAccessToken(data.access_token));
    return data;
  });
};

export const fetchSubReddits = (token, subReddit) => dispatch => {
  return RedditApiUtil.fetchSubReddits(token, subReddit).then(subReddits => {
    dispatch(receiveSubReddits(subReddits));
    return subReddits;
  });
};

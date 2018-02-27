import * as RedditApiUtil from "../util/reddit_api_util";

export const RECEIVE_ACCESS_TOKEN = "RECEIVE_ACCESS_TOKEN";
export const RECEIVE_SUBREDDITS = "RECEIVE_SUBREDDITS";
export const RECEIVE_SUBREDDIT_ABOUT = "RECEIVE_SUBREDDIT_ABOUT";
export const RECEIVE_SUBREDDIT_POINTS = "RECEIVE_SUBREDDIT_POINTS";

const receiveAccessToken = token => {
  return {
    type: RECEIVE_ACCESS_TOKEN,
    token
  };
};

const receiveSubReddits = (subReddits, topic) => {
  subReddits = subReddits.map(subReddit => subReddit.name);

  return {
    type: RECEIVE_SUBREDDITS,
    subReddits,
    topic
  };
};

const receiveSubRedditAbout = (about, subReddit) => {
  let points = Object.values(about.data.children)
    .map(post => {
      return post.data.ups - post.data.downs;
    })
    .reduce((acc, el) => acc + el);

  return {
    type: RECEIVE_SUBREDDIT_ABOUT,
    subReddit,
    points
  };
};

const receiveSubRedditPoints = about => {
  let points = Object.values(about.data.children)
    .map(post => {
      return post.data.ups - post.data.downs;
    })
    .reduce((acc, el) => acc + el);

  return {
    type: RECEIVE_SUBREDDIT_POINTS,
    points
  };
};

export const fetchRedditAccessToken = () => dispatch => {
  return RedditApiUtil.redditAPI().then(data => {
    dispatch(receiveAccessToken(data.access_token));
    return data;
  });
};

export const fetchSubReddits = (token, topic) => dispatch => {
  return RedditApiUtil.fetchSubReddits(token, topic).then(subReddits => {
    dispatch(receiveSubReddits(subReddits, topic));
    return subReddits;
  });
};

export const fetchSubRedditAbout = (token, subReddit) => dispatch => {
  return RedditApiUtil.fetchSubRedditAbout(token, subReddit).then(about => {
    dispatch(receiveSubRedditAbout(about, subReddit));
    return about;
  });
};

export const fetchSubRedditPoints = (token, subReddit) => dispatch => {
  return RedditApiUtil.fetchSubRedditAbout(token, subReddit).then(about => {
    dispatch(receiveSubRedditPoints(about));
    return about;
  });
};

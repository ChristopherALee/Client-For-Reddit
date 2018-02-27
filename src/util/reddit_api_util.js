import authCode from "../secret_codes/reddit_api_code";
import $ from "jquery";

export const redditAPI = () => {
  return $.ajax({
    method: "POST",
    url: "https://www.reddit.com/api/v1/access_token",
    headers: {
      Authorization: `Basic ${authCode}`
    },
    data: {
      grant_type: "client_credentials"
    }
  });
};

export const fetchSubReddits = (token, topic) => {
  return $.ajax({
    method: "GET",
    url: `https://oauth.reddit.com/api/subreddits_by_topic?query=${topic}&limit=50`,
    headers: {
      Authorization: `bearer ${token}`
    }
  });
};

export const fetchSubRedditAbout = (token, subReddit) => {
  return $.ajax({
    method: "GET",
    url: `https://oauth.reddit.com/r/${subReddit}/about`,
    headers: {
      Authorization: `bearer ${token}`
    }
  });
};

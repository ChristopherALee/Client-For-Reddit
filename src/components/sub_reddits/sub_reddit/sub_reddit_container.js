import { connect } from "react-redux";
import SubReddit from "./sub_reddit";
import {
  fetchRedditAccessToken,
  fetchSubReddits,
  fetchSubRedditAbout,
  fetchSubRedditPosts
} from "../../../actions/reddit_api_actions";

const mapStateToProps = (state, ownProps) => {
  let currentSubReddit = ownProps.location.pathname.slice(3);

  let accessToken;
  if (state.session) {
    accessToken = state.session.token;
  }

  let subRedditDetails;
  let description;
  let latestActiveDate;
  if (
    state.entities.subReddits[currentSubReddit] &&
    state.entities.subReddits[currentSubReddit].about
  ) {
    subRedditDetails = state.entities.subReddits[currentSubReddit];

    if (!subRedditDetails.about.data.public_description) {
      description = "No description";
    } else {
      description = subRedditDetails.about.data.public_description;
    }

    let latestPost = subRedditDetails.posts.reverse()[0];
    latestActiveDate = new Date(latestPost.data.created * 1000);
  }

  return {
    accessToken: accessToken,
    currentSubReddit: currentSubReddit,
    subRedditDetails: subRedditDetails,
    description: description,
    latestActiveDate: latestActiveDate
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchRedditAccessToken: () => dispatch(fetchRedditAccessToken()),
    fetchSubReddits: (token, topic) => dispatch(fetchSubReddits(token, topic)),
    fetchSubRedditPosts: (token, subReddit) =>
      dispatch(fetchSubRedditPosts(token, subReddit)),
    fetchSubRedditAbout: (token, subReddit) =>
      dispatch(fetchSubRedditAbout(token, subReddit))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubReddit);

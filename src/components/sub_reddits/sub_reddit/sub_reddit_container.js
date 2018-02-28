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
  if (
    state.entities.subReddits[currentSubReddit] &&
    state.entities.subReddits[currentSubReddit].about
  ) {
    debugger;
    subRedditDetails = state.entities.subReddits[currentSubReddit];
  }

  return {
    accessToken: accessToken,
    currentSubReddit: currentSubReddit,
    subRedditDetails: subRedditDetails
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

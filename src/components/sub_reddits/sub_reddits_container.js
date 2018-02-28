import { connect } from "react-redux";
import SubReddits from "./sub_reddits";
import {
  fetchRedditAccessToken,
  fetchSubReddits,
  fetchSubRedditAbout
} from "../../actions/reddit_api_actions";

const mapStateToProps = (state, ownProps) => {
  let accessToken;
  if (state.session) {
    accessToken = state.session.token;
  }

  let topic = ownProps.location.pathname.slice(8);
  let subReddits;

  if (state.entities.topics[topic]) {
    subReddits = state.entities.topics[topic];
  }

  return {
    accessToken: accessToken,
    topic: topic,
    subReddits: subReddits
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchRedditAccessToken: () => dispatch(fetchRedditAccessToken()),
    fetchSubReddits: (token, topic) => dispatch(fetchSubReddits(token, topic)),
    fetchSubRedditAbout: (token, subReddit) =>
      dispatch(fetchSubRedditAbout(token, subReddit))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubReddits);

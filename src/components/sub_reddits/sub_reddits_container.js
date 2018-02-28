import { connect } from "react-redux";
import SubReddits from "./sub_reddits";
import {
  fetchRedditAccessToken,
  fetchSubReddits,
  fetchSubRedditAbout,
  fetchSubRedditPosts
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

  let relevantSubReddits;
  if (
    Object.values(state.entities.subReddits).every(
      subReddit => Object.values(subReddit).length === 3
    )
  ) {
    relevantSubReddits = Object.values(state.entities.subReddits).filter(
      subReddit => {
        return subReddits.includes(
          subReddit.about.data.url.slice(3, subReddit.about.data.url.length - 1)
        );
      }
    );
  }

  return {
    accessToken: accessToken,
    topic: topic,
    subReddits: subReddits,
    relevantSubReddits: relevantSubReddits
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

export default connect(mapStateToProps, mapDispatchToProps)(SubReddits);

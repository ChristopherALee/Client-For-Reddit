import { connect } from "react-redux";
import Topics from "./topics";
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

  return {
    accessToken: accessToken
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchRedditAccessToken: () => dispatch(fetchRedditAccessToken()),
    fetchSubReddits: (accessToken, topic) =>
      dispatch(fetchSubReddits(accessToken, topic))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Topics);

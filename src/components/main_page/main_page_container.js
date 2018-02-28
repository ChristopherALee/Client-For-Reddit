import { connect } from "react-redux";
import MainPage from "./main_page";
import {
  fetchRedditAccessToken,
  fetchSubReddits,
  fetchSubRedditPosts
} from "../../actions/reddit_api_actions";

const mapStateToProps = (state, ownProps) => {
  let accessToken;
  if (state.session) {
    accessToken = state.session.token;
  }

  return {
    accessToken: accessToken,
    loadingShown: state.ui.loadingShown
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchRedditAccessToken: () => dispatch(fetchRedditAccessToken()),
    fetchSubReddits: (token, subReddit) =>
      dispatch(fetchSubReddits(token, subReddit)),
    fetchSubRedditPosts: (token, subReddit) =>
      dispatch(fetchSubRedditPosts(token, subReddit))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

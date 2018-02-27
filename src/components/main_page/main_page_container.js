import { connect } from "react-redux";
import MainPage from "./main_page";
import {
  fetchRedditAccessToken,
  fetchSubReddits
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
    fetchSubReddits: (token, subReddit) =>
      dispatch(fetchSubReddits(token, subReddit))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

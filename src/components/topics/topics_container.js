import { connect } from "react-redux";
import Topics from "./topics";
import {
  fetchRedditAccessToken,
  fetchSubReddits,
  fetchSubRedditAbout
} from "../../actions/reddit_api_actions";

const mapStateToProps = (state, ownProps) => {
  let accessToken;
  let subReddits;
  if (state.session) {
    accessToken = state.session.token;
    subReddits = state.entities.subReddits;
  }

  const TOPICS = [
    "Architecture",
    "Art",
    "Business",
    "Education",
    "Entertainment",
    "Gaming",
    "General",
    "Hobbies and Interests",
    "Law",
    "Lifestyle",
    "Locations",
    "Meta",
    "Music",
    "News and Politics",
    "Science",
    "Social Science and Humanities",
    "Sports",
    "Technology",
    "Travel",
    "Other"
  ];

  let topicsPoints = {
    Architecture: 0,
    Art: 0,
    Business: 0,
    Education: 0,
    Entertainment: 0,
    Gaming: 0,
    General: 0,
    "Hobbies and Interests": 0,
    Law: 0,
    Lifestyle: 0,
    Locations: 0,
    Meta: 0,
    Music: 0,
    "News and Politics": 0,
    Science: 0,
    "Social Science and Humanities": 0,
    Sports: 0,
    Technology: 0,
    Travel: 0,
    Other: 0
  };

  for (let i = 0; i < TOPICS.length; i++) {
    let currentTopic = TOPICS[i];

    if (subReddits && state.entities.topics[currentTopic]) {
      state.entities.topics[currentTopic].forEach(subReddit => {
        if (subReddits[subReddit]) {
          topicsPoints[currentTopic] += subReddits[subReddit];
        }
      });
    }
  }

  function swap(json) {
    var ret = {};
    for (var key in json) {
      ret[json[key]] = key;
    }

    return ret;
  }

  return {
    accessToken: accessToken,
    subReddits: subReddits,
    topics: state.entities.topics,
    topicsPoints: swap(topicsPoints)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchRedditAccessToken: () => dispatch(fetchRedditAccessToken()),
    fetchSubReddits: (accessToken, topic) =>
      dispatch(fetchSubReddits(accessToken, topic)),
    fetchSubRedditAbout: (accessToken, subReddit) =>
      dispatch(fetchSubRedditAbout(accessToken, subReddit))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Topics);

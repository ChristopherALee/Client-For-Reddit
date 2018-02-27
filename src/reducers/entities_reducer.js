import { combineReducers } from "redux";
import topicsReducer from "./topics/topics_reducer";
import subRedditReducer from "./sub_reddits/sub_reddit_reducer";

const entitiesReducer = combineReducers({
  topics: topicsReducer,
  subReddits: subRedditReducer
});

export default entitiesReducer;

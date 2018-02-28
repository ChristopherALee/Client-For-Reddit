// import { SHOW_LOADING, HIDE_LOADING } from "../actions/reddit_api_actions";

const uiReducer = (state = {}, action) => {
  // let newState;
  Object.freeze(state);

  switch (action.type) {
    // case SHOW_LOADING:
    //   newState = Object.assign({}, state, {
    //     ["loadingShown"]: action.loadingShown
    //   });
    //   return newState;
    // case HIDE_LOADING:
    //   newState = Object.assign({}, state, {
    //     ["loadingShown"]: action.loadingShown
    //   });
    //   return newState;
    default:
      return state;
  }
};

export default uiReducer;

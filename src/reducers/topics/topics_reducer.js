const topicsReducer = (state = {}, action) => {
  let newState;
  Object.freeze(state);

  switch (action.type) {
    default:
      return state;
  }
};

export default topicsReducer;

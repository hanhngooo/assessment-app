// add patterns action
export const ADD_PATTERNS_SUCCESS = "ADD_PATTERNS_SUCCESS";
const addPatternsSuccess = (patterns) => ({
  type: ADD_PATTERNS_SUCCESS,
  payload: patterns,
});

export const addPatterns = (patterns) => {
  return (dispatch) => {
    dispatch(addPatternsSuccess(patterns));
  };
};

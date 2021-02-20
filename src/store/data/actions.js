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

// delete pattern action
export const DELETE_PATTERN_SUCCESS = "DELETE_PATTERN_SUCCESS";
const deletePatternSuccess = (pattern) => ({
  type: DELETE_PATTERN_SUCCESS,
  payload: pattern,
});

export const deletePattern = (pattern) => {
  return (dispatch) => {
    dispatch(deletePatternSuccess(pattern));
  };
};

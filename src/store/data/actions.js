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
const deletePatternSuccess = (id) => ({
  type: DELETE_PATTERN_SUCCESS,
  payload: id,
});

export const deletePattern = (id) => {
  return (dispatch) => {
    dispatch(deletePatternSuccess(id));
  };
};

// edit channel per row
export const EDIT_CHANNEL_SUCCESS = "EDIT_CHANNEL_SUCCESS";
const editPatternSuccess = (data) => ({
  type: EDIT_CHANNEL_SUCCESS,
  payload: data,
});

export const editPattern = (channelValue, index) => {
  return (dispatch) => {
    dispatch(editPatternSuccess({ channelValue: channelValue, index: index }));
  };
};

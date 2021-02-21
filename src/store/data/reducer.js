import {
  ADD_PATTERNS_SUCCESS,
  DELETE_PATTERN_SUCCESS,
  EDIT_CHANNEL_SUCCESS,
} from "./actions";

const initialState = {
  patterns: [
    {
      id: "1",
      textPattern: "Shut Account",
      channel: "Agent Channels",
    },
    {
      id: "2",
      textPattern: "Open Account",
      channel: "Caller Channels",
    },
    {
      id: "3",
      textPattern: "Closed Cart",
      channel: "Both Channels",
    },
    {
      id: "4",
      textPattern: "Update Account",
      channel: "Caller Channels",
    },
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PATTERNS_SUCCESS:
      const addedPatterns = state.patterns.concat(action.payload);
      return {
        ...state,
        patterns: addedPatterns,
      };
    case DELETE_PATTERN_SUCCESS:
      const newPatterns = state.patterns.filter(
        (pattern) => pattern.id !== action.payload
      );
      return {
        ...state,
        patterns: newPatterns,
      };
    case EDIT_CHANNEL_SUCCESS:
      const editedPatterns = state.patterns.map((pattern, i) =>
        i === action.payload.index
          ? { ...pattern, channel: action.payload.channelValue }
          : pattern
      );
      return {
        ...state,
        patterns: editedPatterns,
      };

    default:
      return state;
  }
};

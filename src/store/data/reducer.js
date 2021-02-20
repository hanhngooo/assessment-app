import { ADD_PATTERNS_SUCCESS } from "./actions";

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
      const updatedPatterns = state.patterns.concat(action.payload);
      return {
        ...state,
        patterns: updatedPatterns,
      };
    default:
      return state;
  }
};

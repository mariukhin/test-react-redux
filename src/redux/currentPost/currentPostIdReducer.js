import { ActionType } from './currentPostActions';

const currentPostIdReducer = (state = null, { type, payload }) => {
  switch (type) {
    case ActionType.SET_CURRENT_POST:
      return payload;
    default:
      return state;
  }
};

export default currentPostIdReducer;

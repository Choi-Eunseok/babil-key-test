import types from '../actions/types';

const count = 0;
export default (state = count, action) => {
  switch (action.type) {
    case types.COUNT_UP:
      return state + action.payload;
    case types.COUNT_DOWN:
      return state - action.payload;
    default:
      return state;
  }
};
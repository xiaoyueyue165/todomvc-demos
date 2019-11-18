import { SET_TODO_FILTER } from '../constants/actionTypes';
const visibilityFilter = (state = 'all', action) => {
  switch (action.type) {
    case SET_TODO_FILTER:
      return action.filter;
    default:
      return state;
  }
};

export default visibilityFilter;

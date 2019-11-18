import * as types from '../constants/actionTypes';
export const addTodo = (id, text) => {
  return {
    type: types.ADD_TODO,
    id,
    text
  };
};

export const toggleTodo = id => {
  return {
    type: types.TOGGLE_TODO,
    id
  };
};

export const toggleAllTodo = () => {
  return {
    type: types.TOGGLE_ALL_TODO
  };
};

export const deleteTodo = id => {
  return {
    type: types.DELETE_TODO,
    id
  };
};

export const editModeToggle = id => {
  return {
    type: types.EDIT_MODE_TOGGLE,
    id
  };
};
export const editTodo = (id, text) => {
  return {
    type: types.EDIT_TODO,
    id,
    text
  };
};
export const clearCompletedTodo = () => {
  return {
    type: types.CLEAR_COMPLETED_TODO
  };
};
export const setTodoFilter = filter => {
  return {
    type: types.SET_TODO_FILTER,
    filter
  };
};

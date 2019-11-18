import {
  ADD_TODO,
  TOGGLE_TODO,
  EDIT_MODE_TOGGLE,
  EDIT_TODO,
  TOGGLE_ALL_TODO,
  DELETE_TODO,
  CLEAR_COMPLETED_TODO
} from '../constants/actionTypes';

const initState = [
  {
    id: 1,
    name: '吃饭',
    isCompleted: true,
    isEdit: false
  },
  {
    id: 2,
    name: '睡觉',
    isCompleted: false,
    isEdit: false
  },
  {
    id: 3,
    name: '打豆豆',
    isCompleted: false,
    isEdit: false
  }
];
const todos = (state = initState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: action.id,
          name: action.text,
          isCompleted: false,
          isEdit: false
        }
      ];
    case TOGGLE_TODO:
      return state.map(todo =>
        todo.id === action.id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      );
    case EDIT_MODE_TOGGLE:
      return state.map(todo =>
        todo.id === action.id ? { ...todo, isEdit: !todo.isEdit } : todo
      );
    case EDIT_TODO:
      return state.map(todo =>
        todo.id === action.id ? { ...todo, name: action.text } : todo
      );
    case TOGGLE_ALL_TODO:
      let temp = JSON.parse(JSON.stringify(state));
      let isAllCompleted = temp.every(item => item.isCompleted === true);
      temp.forEach(item => {
        isAllCompleted ? (item.isCompleted = false) : (item.isCompleted = true);
      });
      return temp;
    case DELETE_TODO:
      return state.filter(todo => todo.id !== action.id);
    case CLEAR_COMPLETED_TODO:
      return state.filter(todo => !todo.isCompleted);
    default:
      return state;
  }
};

export default todos;

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleTodo, deleteTodo, editModeToggle, editTodo } from '../actions';

class TodoList extends React.PureComponent {
  showResulData(data, type) {
    if (type === 'active') {
      return data.filter(item => {
        return item.isCompleted === false;
      });
    }
    if (type === 'completed') {
      return data.filter(item => {
        return item.isCompleted === true;
      });
    }
    return data;
  }
  render() {
    // 1. 获取数据并显示到页面中
    const { todos, filter } = this.props;
    const result = this.showResulData(todos, filter);
    return (
      <ul className="todo-list">
        {result.map(item => (
          <li
            className={item.isCompleted === true ? 'completed' : ''}
            key={item.id}
          >
            {item.isEdit === false ? (
              <div className="view">
                <input
                  // 4. 更改任务状态
                  onClick={() => this.props.toggleTodo(item.id)}
                  className="toggle"
                  type="checkbox"
                  readOnly
                  checked={item.isCompleted ? 'checked' : ''}
                />
                <label onDoubleClick={() => this.props.editModeToggle(item.id)}>
                  {item.name}
                </label>
                <button
                  className="destroy"
                  // 3. 删除任务（单个）
                  onClick={() => this.props.deleteTodo(item.id)}
                ></button>
              </div>
            ) : (
              <input
                className="edit"
                style={{ display: 'block' }}
                value={item.name}
                onChange={e => this.props.editTodo(item.id, e.target.value)}
                onBlur={() => this.props.editModeToggle(item.id)}
              />
            )}
          </li>
        ))}
      </ul>
    );
  }
}
TodoList.propTypes = {
  todos: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    todos: state.todos,
    filter: state.visibilityFilter
  };
};

export default connect(mapStateToProps, {
  toggleTodo,
  deleteTodo,
  editModeToggle,
  editTodo
})(TodoList);

import React from 'react';
import { connect } from 'react-redux';
import { setTodoFilter, clearCompletedTodo } from '../actions';
class TodoFilter extends React.PureComponent {
  render() {
    // 6. 计算未完成任务的数量
    const { todos, filter: type } = this.props;
    let todoCount = 0;
    todos.forEach(v => {
      return v.isCompleted === false ? (todoCount += 1) : '';
    });

    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{todoCount}</strong> item left
        </span>
        <ul className="filters">
          <li>
            <a
              className={type === 'all' ? 'selected' : ''}
              // 5. 增加筛选
              onClick={() => this.props.setTodoFilter('all')}
            >
              All
            </a>
          </li>
          <li>
            <a
              className={type === 'active' ? 'selected' : ''}
              onClick={() => this.props.setTodoFilter('active')}
            >
              Active
            </a>
          </li>
          <li>
            <a
              className={type === 'completed' ? 'selected' : ''}
              onClick={() => this.props.setTodoFilter('completed')}
            >
              Completed
            </a>
          </li>
        </ul>
        <button
          className="clear-completed"
          // 7. 清空已完成任务
          onClick={() => this.props.clearCompletedTodo()}
        >
          Clear completed
        </button>
      </footer>
    );
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todos,
    filter: state.visibilityFilter
  };
};
export default connect(mapStateToProps, { setTodoFilter, clearCompletedTodo })(
  TodoFilter
);

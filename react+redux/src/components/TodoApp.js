import React from 'react';
import { connect } from 'react-redux';
import TodoList from './TodoList';
import TodoFilter from './TodoFilter';
import { addTodo, toggleAllTodo } from '../actions';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }
  handleSubmit = event => {
    event.preventDefault();
    const { text } = this.state;
    if (!text) {
      return;
    }
    const { todos } = this.props;
    const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
    // 2. 添加任务
    this.props.addTodo(newId, text);
    this.setState({
      text: ''
    });
  };
  setInputChange = val => {
    this.setState({
      text: val
    });
  };
  render() {
    const { text } = this.state;
    return (
      <React.Fragment>
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={e => this.handleSubmit(e)}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              autoFocus
              value={text}
              onChange={e => this.setInputChange(e.target.value)}
            />
          </form>
        </header>

        <section className="main">
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            // 8. 批量更改任务状态
            onClick={this.props.toggleAllTodo}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList />
        </section>
        <TodoFilter />
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    todos: state.todos
  };
};

export default connect(mapStateToProps, { addTodo, toggleAllTodo })(TodoApp);

import React from 'react';

class TodoFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'all'
    };
  }
  onSetFilterType = type => {
    this.setState(
      {
        type: type
      },
      () => {
        this.props.TodoFilter(type);
      }
    );
  };
  render() {
    const { type } = this.state;
    // todo 数量
    const { data } = this.props;
    let todoCount = 0;
    data.forEach(v => {
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
              onClick={() => this.onSetFilterType('all')}
            >
              All
            </a>
          </li>
          <li>
            <a
              className={type === 'active' ? 'selected' : ''}
              onClick={() => this.onSetFilterType('active')}
            >
              Active
            </a>
          </li>
          <li>
            <a
              className={type === 'completed' ? 'selected' : ''}
              onClick={() => this.onSetFilterType('completed')}
            >
              Completed
            </a>
          </li>
        </ul>
        <button
          className="clear-completed"
          onClick={() => this.props.clearComplete()}
        >
          Clear completed
        </button>
      </footer>
    );
  }
}

export default TodoFilter;

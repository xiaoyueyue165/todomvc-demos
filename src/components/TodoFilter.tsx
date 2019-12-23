import React from "react";
import { Todo, TodoListType, filterType } from "../type";
type MyProps = {
  data: TodoListType;
  TodoFilter: (type: string) => void;
};
type MyState = {
  type: filterType;
};

class TodoFilter extends React.Component<MyProps, MyState> {
  state: MyState = {
    type: "all"
  };
  onSetFilterType = (type: filterType) => {
    this.setState({ type: type }, () => {
      this.props.TodoFilter(type);
    });
  };
  render() {
    const { data } = this.props;
    const { type } = this.state;
    let todoCount = 0;
    data.forEach((v: Todo) => {
      return v.isCompleted === false ? (todoCount += 1) : "";
    });

    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{todoCount}</strong> item left
        </span>
        <ul className="filters">
          <li>
            <a
              className={type === "all" ? "selected" : ""}
              onClick={() => this.onSetFilterType("all")}
            >
              All
            </a>
          </li>
          <li>
            <a
              className={type === "active" ? "selected" : ""}
              onClick={() => this.onSetFilterType("active")}
            >
              Active
            </a>
          </li>
          <li>
            <a
              className={type === "completed" ? "selected" : ""}
              onClick={() => this.onSetFilterType("completed")}
            >
              Completed
            </a>
          </li>
        </ul>
        <button className="clear-completed">Clear completed</button>
      </footer>
    );
  }
}

export default TodoFilter;

import React from "react";
import { Todo, TodoListType, filterType } from "../type";
type MyProps = {
  data: TodoListType;
  type: filterType;
  deleteOneById: (id: string) => void;
  completeOneById: (id: string) => void;
};
type MyState = {
  mode: "onShow" | "onEdit";
};
class TodoList extends React.Component<MyProps, MyState> {
  state: MyState = {
    mode: "onShow"
  };
  deleteItem(id: string) {
    this.props.deleteOneById(id);
  }
  completeItem(id: string) {
    this.props.completeOneById(id);
  }
  showResulData(data: TodoListType, type: any) {
    if (type === "active") {
      return data.filter((item: Todo) => {
        return item.isCompleted === false;
      });
    }
    if (type === "completed") {
      return data.filter((item: Todo) => {
        return item.isCompleted === true;
      });
    }
    return data;
  }
  render() {
    const { data, type } = this.props;
    const result = this.showResulData(data, type);

    return (
      <ul className="todo-list">
        {result.map((item: Todo) => (
          <li
            className={item.isCompleted === true ? "completed" : ""}
            key={item.id}
          >
            {item.mode === "onShow" ? (
              <div className="view">
                <input
                  className="toggle"
                  type="checkbox"
                  onClick={this.completeItem.bind(this, item.id)}
                  defaultChecked={item.isCompleted ? true : false}
                />
                <label>{item.name}</label>
                <button
                  className="destroy"
                  onClick={this.deleteItem.bind(this, item.id)}
                ></button>
              </div>
            ) : (
              "Loading..."
            )}

            {item.mode === "onEdit" ? (
              <input
                className="edit"
                style={{ display: "block" }}
                value={item.name}
              />
            ) : (
              ""
            )}
          </li>
        ))}
      </ul>
    );
  }
}

export default TodoList;

import React, { useState, useEffect, createRef } from "react";
import "./static/base.css";
import "./static/index.css";
import TodoList from "./components/TodoList";
import TodoFilter from "./components/TodoFilter";
import axios from "axios";
import { Todo, TodoListType, filterType } from "./types/index";

function App() {
  const [data, setTodoListData] = useState<any>([]);
  const [text, setInputChange] = useState("");
  const [type, setFilterType] = useState<any>("all");
  const textInput = createRef<HTMLInputElement>();
  // 1. 获取数据并显示到页面中
  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        "https://xiaoyueyue.org/todomvc-demos/static/data.json"
      );
      result.data.forEach((v: Todo) => {
        v.mode = "onShow";
      });
      setTodoListData(result.data);
    }
    fetchData();
  }, []);

  // 2.  添加任务
  function handleSubmit(event: any) {
    event.preventDefault();
    if (textInput.current === null) return;
    if (!text) {
      return;
    }
    const newItem = {
      id: data[data.length - 1].id + 1,
      name: text,
      isCompleted: false,
      mode: "onShow"
    };

    setTodoListData((prevState: TodoListType) => [...prevState, newItem]);
    textInput.current.value = "";
  }

  // 3. 删除任务（单个）
  function deleteOne(id: string) {
    let deleteIndex = data.findIndex((v: Todo) => v.id === id);
    data.splice(deleteIndex, 1);
    // setData(data) 异步方法必须传递函数
    setTodoListData((prevState: TodoListType) =>
      prevState.filter(val => val.id != id)
    );
  }
  // 4. 更改任务状态
  function completeOne(id: string) {
    setTodoListData((prevState: TodoListType) =>
      prevState.map(v => {
        if (v.id === id) {
          v.isCompleted = !v.isCompleted;
        }
        return v;
      })
    );
  }

  // 5. 增加筛选
  function onFilterTodoList(type: filterType) {
    setFilterType(type);
  }

  // 7. 清空已完成任务
  function completedClearn() {
    setTodoListData(data.filter((item: Todo) => item.isCompleted === false));
  }

  // 8. 批量更改任务状态
  function toggleAllTodos() {
    let isAllCompleted = data.every((item: Todo) => item.isCompleted === true);
    setTodoListData((prevState: TodoListType) =>
      prevState.map((v: Todo) => {
        if (isAllCompleted) {
          v.isCompleted = false;
        } else {
          v.isCompleted = true;
        }
        return v;
      })
    );
  }
  // 9. - 编辑状态切换
  function changeValMode(id: string, mode: string) {
    setTodoListData((prevState: TodoListType) =>
      prevState.map((v: Todo) => {
        if (v.id === id) {
          v.mode = "onEdit";
        }
        return v;
      })
    );
  }

  // - 编辑模式
  function editItemById(id: string, val: string) {
    setTodoListData((prevState: TodoListType) =>
      prevState.map((v: Todo) => {
        if (v.id === id) {
          v.name = val;
        }
        return v;
      })
    );
  }
  // - 编辑结束
  function fnishEdit(id: string) {
    setTodoListData((prevState: TodoListType) =>
      prevState.map((v: Todo) => {
        if (v.id === id) {
          v.mode = "onShow";
        }
        return v;
      })
    );
  }
  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={e => handleSubmit(e)}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            ref={textInput}
            onChange={e => setInputChange(e.target.value)}
          />
        </form>
        <section className="main">
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            onClick={toggleAllTodos}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList
            data={data}
            type={type}
            deleteOneById={deleteOne}
            completeOneById={completeOne}
            changeValMode={changeValMode}
            editItemById={editItemById}
            fnishEdit={fnishEdit}
          />
        </section>
      </header>

      <TodoFilter
        data={data}
        TodoFilter={onFilterTodoList}
        clearComplete={completedClearn}
      />
    </div>
  );
}

export default App;

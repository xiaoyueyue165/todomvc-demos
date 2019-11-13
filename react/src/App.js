import React, { useState, useEffect } from 'react';
import './static/base.css';
import './static/index.css';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [text, setInputChange] = useState('');
  const [type, setFilterType] = useState('all');
  useEffect(async () => {
    const result = await axios(
      'https://xiaoyueyue.org/todomvc-demos/static/data.json'
    );
    result.data.forEach(v => {
      v.mode = 'onShow';
    });
    setData(result.data);
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    if (!text) {
      return;
    }
    const newItem = {
      name: text,
      isCompleted: false,
      id: data[data.length - 1].id + 1
    };

    setData(data.concat(newItem));
    setInputChange('');
  }

  function deleteOne(id) {
    let deleteIndex = data.findIndex(v => v.id === id);
    data.splice(deleteIndex, 1);
    // setData(data) 异步方法必须传递函数
    setData(
      data.filter(function(val) {
        return val.id != id;
      })
    );
  }

  function completeOne(id) {
    data.forEach(function(item, index) {
      return item.id === id ? (item.isCompleted = !item.isCompleted) : '';
    });
    setData(
      data.filter(function(val) {
        return val;
      })
    );
  }

  function onFilterTodoList(type) {
    setFilterType(type);
  }
  function completedClearn() {
    setData(
      data.filter(function(item) {
        return item.isCompleted === false;
      })
    );
  }
  // 批量更改
  function doAllCompleted() {
    data.forEach(function(item, index) {
      return item.isCompleted === false ? (item.isCompleted = true) : '';
    });
    setData(
      data.filter(function(val) {
        return val;
      })
    );
  }
  // 编辑状态切换
  function changeValMode(id, mode) {
    console.log(id, mode);
    data.forEach(function(item, index) {
      return item.id === id ? (item.mode = 'onEdit') : '';
    });
    setData(
      data.filter(function(val) {
        return val;
      })
    );
    console.log(data);
  }
  // 编辑模式
  function editItemById(id, val) {
    console.log('edit', val);

    data.forEach(function(item, index) {
      return item.id === id ? (item.name = val) : '';
    });
    setData(
      data.filter(function(val) {
        return val;
      })
    );
    console.log(data);
  }
  // 编辑结束
  function fnishEdit(id) {
    console.log('编辑结束设置', id);

    data.forEach(function(item, index) {
      return item.id === id ? (item.mode = 'onShow') : '';
    });
    setData(
      data.filter(function(val) {
        return val;
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
            value={text}
            onChange={e => setInputChange(e.target.value)}
          />
        </form>
        <section className="main">
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            onClick={doAllCompleted}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList
            type={type}
            data={data}
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

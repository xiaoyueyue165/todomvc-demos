import React, { useState, useEffect } from 'react';
import './static/base.css';
import './static/index.css';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import axios from 'axios';

function App() {
  const [data, setTodoListData] = useState([]);
  const [text, setInputChange] = useState('');
  const [type, setFilterType] = useState('all');
  // 1. 获取数据并显示到页面中
  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        'https://xiaoyueyue.org/todomvc-demos/static/data.json'
      );
      result.data.forEach(v => {
        v.mode = 'onShow';
      });
      setTodoListData(result.data);
    }
    fetchData();
  }, []);

  // 2.  添加任务
  function handleSubmit(event) {
    event.preventDefault();
    if (!text) {
      return;
    }
    const newItem = {
      id: data[data.length - 1].id + 1,
      name: text,
      isCompleted: false,
      mode: 'onShow'
    };

    setTodoListData(data.concat(newItem));
    setInputChange('');
  }

  // 3. 删除任务（单个）
  function deleteOne(id) {
    let deleteIndex = data.findIndex(v => v.id === id);
    data.splice(deleteIndex, 1);
    // setTodoListData(data) 异步方法必须传递函数
    setTodoListData(
      data.filter(function(val) {
        return val.id !== id;
      })
    );
  }
  // 4. 更改任务状态
  function completeOne(id) {
    data.forEach(function(item, index) {
      return item.id === id ? (item.isCompleted = !item.isCompleted) : '';
    });
    setTodoListData(
      data.filter(function(val) {
        return val;
      })
    );
  }
  // 5. 增加筛选
  function onFilterTodoList(type) {
    setFilterType(type);
  }
  // 7. 清空已完成任务
  function completedClearn() {
    setTodoListData(
      data.filter(function(item) {
        return item.isCompleted === false;
      })
    );
  }
  // 8. 批量更改任务状态
  function doAllCompleted() {
    let isAllCompleted = data.every(item => item.isCompleted === true);
    data.forEach(function(item, index) {
      return isAllCompleted
        ? (item.isCompleted = false)
        : (item.isCompleted = true);
    });
    setTodoListData(
      data.filter(function(val) {
        return val;
      })
    );
  }
  // 9. - 编辑状态切换
  function changeValMode(id, mode) {
    console.log(id, mode);
    data.forEach(function(item, index) {
      return item.id === id ? (item.mode = 'onEdit') : '';
    });
    setTodoListData(
      data.filter(function(val) {
        return val;
      })
    );
    console.log(data);
  }
  // - 编辑模式
  function editItemById(id, val) {
    console.log('edit', val);

    data.forEach(function(item, index) {
      return item.id === id ? (item.name = val) : '';
    });
    setTodoListData(
      data.filter(function(val) {
        return val;
      })
    );
    console.log(data);
  }
  // - 编辑结束
  function fnishEdit(id) {
    console.log('编辑结束设置', id);

    data.forEach(function(item, index) {
      return item.id === id ? (item.mode = 'onShow') : '';
    });
    setTodoListData(
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

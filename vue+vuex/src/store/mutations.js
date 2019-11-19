export default {
  TODOS_REQUEST(state) {
    state.todos_loading = true;
  },
  TODOS_SUCCESS(state, todos) {
    state.todos_loading = false;
    state.todos = todos;
  },
  TODOS_FAILURE(state, error) {
    state.todos_loading = false;
    state.todos_error = error;
  },
  // 2. 添加任务
  addTodo(state, e) {
    if (e.target.value.trim()) {
      state.todos.push({
        id: state.todos[state.todos.length - 1].id + 1,
        name: e.target.value.trim(),
        isCompleted: false,
        isEdit: false
      });
      e.target.value = "";
    } else {
      alert("Todo 内容不能为空哦");
    }
  },
  // 3. 删除任务（单个）
  deleteTodo(state, todoId) {
    state.todos = state.todos.filter(v => v.id !== todoId);
  },
  // 5. 增加筛选
  setTodoFilter(state, filter) {
    state.filterTodoKeyWord = filter;
  },
  // 7. 清空已完成任务
  clearAllCompleted(state) {
    state.todos = state.todos.filter(v => !v.isCompleted);
  },
  // 8. 批量更改任务状态
  toggleAllCompletedTodos(state) {
    let isAllCompleted = state.todos.every(todo => todo.isCompleted);
    state.todos.forEach(v =>
      isAllCompleted ? (v.isCompleted = false) : (v.isCompleted = true)
    );
  }
};

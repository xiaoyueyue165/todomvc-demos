<template>
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input class="new-todo" placeholder="What needs to be done?" autofocus @keyup.enter="addTodo" />
    </header>
    <section class="main">
      <input id="toggle-all" class="toggle-all" type="checkbox" @click="toggleAllCompletedTodos" />
      <label for="toggle-all">Mark all as complete</label>
      <TodoItems
        :data="filteredTodos"
        @del="deleteTodoById"
        @edit="editTodoById"
        @editClose="editFinished"
      />
    </section>
    <footer class="footer">
      <span class="todo-count">
        <strong>{{notFinshTodoCount}}</strong> item left
      </span>
      <TodoFilter
        :filter="filter"
        @toggleFilter="toggleToodFilterType"
        @clearCompleted="clearAllCompleted"
      />
    </footer>
  </section>
</template>

<script>
import TodoItems from "./TodoItems";
import TodoFilter from "./TodoFilter";
import axios from "axios";
export default {
  name: "TodoList",
  data() {
    return {
      todos: [],
      filter: "all"
    };
  },
  components: {
    TodoItems,
    TodoFilter
  },
  computed: {
    // 6. 计算未完成任务的数量
    notFinshTodoCount() {
      return this.todos.filter(todo => !todo.isCompleted).length;
    },
    // 5. 增加筛选
    filteredTodos() {
      if (this.filter === "active") {
        return this.todos.filter(todo => !todo.isCompleted);
      }
      if (this.filter === "completed") {
        return this.todos.filter(todo => todo.isCompleted);
      }
      return this.todos;
    }
  },
  methods: {
    fetchData() {
      let that = this;
      async function fetchTodos() {
        const result = await axios(
          "https://xiaoyueyue.org/todomvc-demos/static/data.json"
        );
        result.data.forEach(v => {
          v.isEdit = false;
        });
        that.todos = result.data;
      }
      fetchTodos();
    },
    // 2. 添加任务
    addTodo(e) {
      if (e.target.value.trim()) {
        this.todos.push({
          id: this.todos[this.todos.length - 1].id + 1,
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
    deleteTodoById(todoId) {
      this.todos = this.todos.filter(v => v.id !== todoId);
    },
    // 7. 清空已完成任务
    clearAllCompleted() {
      this.todos = this.todos.filter(v => !v.isCompleted);
    },
    toggleToodFilterType(filterType) {
      this.filter = filterType;
    },
    // 8. 批量更改任务状态
    toggleAllCompletedTodos() {
      let isAllCompleted = this.todos.every(todo => todo.isCompleted);
      this.todos.forEach(v =>
        isAllCompleted ? (v.isCompleted = false) : (v.isCompleted = true)
      );
    },
    // 9. 修改任务名称 - 开始编辑
    editTodoById(todoId) {
      let Index = this.todos.findIndex(todo => todo.id === todoId);
      this.todos[Index].isEdit = true;
    },
    // - 结束编辑
    editFinished(todoId) {
      let Index = this.todos.findIndex(todo => todo.id === todoId);
      this.todos[Index].isEdit = false;
    }
  },
  mounted() {
    // 1. 获取数据并显示到页面中
    this.fetchData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

<template>
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input
        class="new-todo"
        placeholder="What needs to be done?"
        autofocus
        @keyup.enter="addTodo"
      />
    </header>
    <section class="main">
      <input
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        @click="toggleAllCompletedTodos"
      />
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list" v-if="todos_loading">
        <li>
          <div
            class="view"
            :style="{ textAlign: 'center', height: '58px', lineHeight: '58px' }"
          >
            loading...
          </div>
        </li>
      </ul>
      <ul class="todo-list" v-if="todos_error">
        <li>
          <div
            class="view"
            :style="{ textAlign: 'center', height: '58px', lineHeight: '58px' }"
          >
            {{ todos_error }}
          </div>
        </li>
      </ul>
      <TodoItems
        v-if="!todos_loading && todos_error === null"
        :data="filteredTodos"
        @edit="editTodoById"
        @editClose="editFinished"
      />
    </section>
    <footer class="footer">
      <span class="todo-count">
        <strong>{{ notFinshTodoCount }}</strong> item left
      </span>
      <TodoFilter />
    </footer>
  </section>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import TodoItems from "./TodoItems";
import TodoFilter from "./TodoFilter";

export default {
  name: "TodoList",
  components: {
    TodoItems,
    TodoFilter
  },
  computed: {
    //  todos 相关显示到页面中
    ...mapState(["todos", "todos_loading", "todos_error", "filterTodoKeyWord"]),

    // 6. 计算未完成任务的数量
    notFinshTodoCount() {
      return this.todos.filter(todo => !todo.isCompleted).length;
    },
    //  - 筛选细节控制
    filteredTodos() {
      if (this.filterTodoKeyWord === "active") {
        return this.todos.filter(todo => !todo.isCompleted);
      }
      if (this.filterTodoKeyWord === "completed") {
        return this.todos.filter(todo => todo.isCompleted);
      }
      return this.todos;
    }
  },
  methods: {
    ...mapMutations(["addTodo", "toggleAllCompletedTodos"]),
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
    //  1. 获取数据并显示到页面中 - 触发 action
    this.$store.dispatch("fetchTodos");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

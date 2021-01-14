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
      <TodoItems
        :data="filteredTodos"
        @del="deleteTodoById"
        @edit="editTodoById"
        @editClose="editFinished"
      />
    </section>
    <footer class="footer">
      <span class="todo-count">
        <strong>{{ notFinshTodoCount }}</strong> item left
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
import { ref, computed, onMounted } from "vue";
import useTodoStore from "../use/useTodoStore";
import TodoItems from "./TodoItems";
import TodoFilter from "./TodoFilter";

export default {
  name: "TodoList",
  components: {
    TodoItems,
    TodoFilter,
  },
  setup() {
    const filter = ref("all");
    let todos = ref([]);

    onMounted(async () => {
      // 1. 获取数据并显示到页面中
      todos.value = await useTodoStore.fetch();
    });

    // 2. 添加任务
    const addTodo = (e) => {
      if (e.target.value.trim()) {
        todos.value.push({
          id: todos.value[todos.value.length - 1].id + 1,
          name: e.target.value.trim(),
          isCompleted: false,
          isEdit: false,
        });
        e.target.value = "";
      } else {
        alert("Todo 内容不能为空哦");
      }
    };

    // 3. 删除任务（单个）
    const deleteTodoById = (todoId) => {
      todos.value = todos.value.filter((v) => v.id !== todoId);
    };

    // 5. 增加筛选
    const filteredTodos = computed(() => {
      if (filter.value === "active") {
        return todos.value.filter((todo) => !todo.isCompleted);
      }
      if (filter.value === "completed") {
        return todos.value.filter((todo) => todo.isCompleted);
      }
      return todos.value;
    });

    // 6. 计算未完成任务的数量
    const notFinshTodoCount = computed(() => {
      return todos.value.filter((todo) => !todo.isCompleted).length;
    });
    return {
      filter,
      todos,
      filteredTodos,
      notFinshTodoCount,
      addTodo,
      deleteTodoById,
    };
  },
  methods: {
    // 7. 清空已完成任务
    clearAllCompleted() {
      this.todos = this.todos.filter((v) => !v.isCompleted);
    },
    toggleToodFilterType(filterType) {
      this.filter = filterType;
    },
    // 8. 批量更改任务状态
    toggleAllCompletedTodos() {
      let isAllCompleted = this.todos.every((todo) => todo.isCompleted);
      this.todos.forEach((v) =>
        isAllCompleted ? (v.isCompleted = false) : (v.isCompleted = true)
      );
    },
    // 9. 修改任务名称 - 开始编辑
    editTodoById(todoId) {
      let Index = this.todos.findIndex((todo) => todo.id === todoId);
      this.todos[Index].isEdit = true;
    },
    // - 结束编辑
    editFinished(todoId) {
      let Index = this.todos.findIndex((todo) => todo.id === todoId);
      this.todos[Index].isEdit = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

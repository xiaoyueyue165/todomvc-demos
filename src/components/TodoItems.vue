<template>
  <ul class="todo-list">
    <li
      class="[item.isCompleted ? 'completed':'']"
      v-for="item in data"
      :key="item.id"
    >
      <div class="view" v-if="item.isEdit === false">
        <!-- 4. 更改任务状态 -->
        <input class="toggle" type="checkbox" v-model="item.isCompleted" />
        <label @dblclick="changeToEditState(item.id)">{{ item.name }}</label>
        <button class="destroy" @click="deleteTodo(item.id)"></button>
      </div>
      <input
        v-else-if="item.isEdit === true"
        :style="{ display: 'block' }"
        class="edit"
        v-model="item.name"
        @blur="finishedEdit(item.id)"
      />
    </li>
  </ul>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "TodoItem",
  props: {
    data: { type: Array, require: true }
  },
  methods: {
    ...mapMutations(["deleteTodo"]),
    changeToEditState(todoId) {
      this.$emit("edit", todoId);
    },
    finishedEdit(todoId) {
      this.$emit("editClose", todoId);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

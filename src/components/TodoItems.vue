<template>
  <ul class="todo-list">
    <li class="[item.isCompleted ? 'completed':'']" v-for="item in data" :key="item.id">
      <div class="view" v-if="item.isEdit=== false">
        <input class="toggle" type="checkbox" v-model="item.isCompleted" />
        <label @dblclick="changeToEditState(item.id)">{{item.name}}</label>
        <button class="destroy" @click="deleteTodo(item.id)"></button>
      </div>
      <input
        v-else-if="item.isEdit=== true"
        :style="{display:'block'}"
        class="edit"
        v-model="item.name"
        @blur="finishedEdit(item.id)"
      />
    </li>
  </ul>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    data: { type: Array, require: true }
  },
  methods: {
    deleteTodo(todoId) {
      this.$emit("del", todoId);
    },
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

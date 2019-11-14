<template>
  <div>
    <ul class="filters">
      <li v-for="state in states" :key="state" @click="toggleFilter(state)">
        <a :class="[state === filter ? 'selected': '']">{{state[0].toUpperCase() + state.slice(1)}}</a>
      </li>
    </ul>
    <button class="clear-completed" @click="clearCompleted">Clear completed</button>
  </div>
</template>

<script>
export default {
  name: "TodoFilter",
  props: {
    filter: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      states: ["all", "active", "completed"]
    };
  },
  methods: {
    clearCompleted() {
      this.$emit("clearCompleted");
    },
    toggleFilter(state) {
      this.$emit("toggleFilter", state);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

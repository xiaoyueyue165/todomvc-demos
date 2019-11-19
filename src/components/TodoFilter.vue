<template>
  <div>
    <ul class="filters">
      <li v-for="state in states" :key="state" @click="setTodoFilter(state)">
        <a :class="[state === filterTodoKeyWord ? 'selected' : '']">{{
          state[0].toUpperCase() + state.slice(1)
        }}</a>
      </li>
    </ul>
    <button class="clear-completed" @click="clearAllCompleted">
      Clear completed
    </button>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "TodoFilter",
  data() {
    return {
      states: ["all", "active", "completed"]
    };
  },
  computed: {
    ...mapState(["filterTodoKeyWord"])
  },
  methods: {
    ...mapMutations(["setTodoFilter", "clearAllCompleted"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

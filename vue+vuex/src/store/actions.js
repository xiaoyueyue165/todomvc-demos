import axios from "axios";
export default {
  fetchTodos(context) {
    context.commit("TODOS_REQUEST");
    async function fetchData() {
      await axios("https://xiaoyueyue.org/todomvc-demos/static/data.json")
        .then(result => {
          result.data.forEach(v => {
            v.isEdit = false;
          });
          context.commit("TODOS_SUCCESS", result.data);
        })
        .catch(function(error) {
          context.commit("TODOS_FAILURE", error);
        });
    }
    fetchData();
  }
};

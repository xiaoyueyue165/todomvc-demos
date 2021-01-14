import axios from "axios";

export default {
  fetch() {
    return new Promise(function(resolve, reject) {
      axios
        .get("https://xiaoyueyue.org/todomvc-demos/static/data.json")
        .then((result) => {
          result.data.forEach((v) => {
            v.isEdit = false;
          });
          resolve(result.data);
          reject([]);
        });
    });
  },
};

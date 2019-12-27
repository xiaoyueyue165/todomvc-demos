let TODOS = null;
axios("https://xiaoyueyue.org/todomvc-demos/static/data.json").then(result => {
  TODOS = result.data;
  renderTodoList();
});

function createElementFromHTML(htmlString) {
  var div = document.createElement("div");
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
}
// id: 1,isCompleted: true, name: "吃饭"

function renderTodoList() {
  let dataArr = TODOS;
  if (dataArr.length === 0) {
    throw new Error("数据为空");
  }
  let fragment = document.createDocumentFragment();
  let ul = document.querySelector(".todo-list");
  //   dataArr.forEach(item => {
  //     let li = document.createElement("li");
  //     item.isCompleted ? li.classList.add("completed") : "";

  //     let view = document.createElement("div");
  //     view.classList.add("view");

  //     let input = document.createElement("input");
  //     input.classList.add("toggle");
  //     input.setAttribute("type", "checkbox");
  //     item.isCompleted ? input.setAttribute("checked", "checked") : "";

  //     let label = document.createElement("label");
  //     label.innerText = item.name;

  //     let button = document.createElement("button");
  //     button.classList.add("destroy");

  //     let editInput = document.createElement("input");
  //     editInput.classList.add("edit");

  //     view.appendChild(input);
  //     view.appendChild(label);
  //     view.appendChild(button);
  //     li.appendChild(view);
  //     li.appendChild(editInput);

  dataArr.forEach(item => {
    let li_class = item.isCompleted ? "completed" : "";
    let input_checkedState = item.isCompleted ? "checked" : "";
    let dom = `<li class=${li_class}>
        <div class="view">
          <input class="toggle" type="checkbox" ${input_checkedState} />
          <label>${item.name}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template" />
      </li>;`;

    let li = createElementFromHTML(dom);
    fragment.appendChild(li);
  });
  ul.innerHTML = "";
  ul.appendChild(fragment);
}

document.querySelector(".new-todo").addEventListener("keydown", function(e) {
  var value = this.value;
  if ((e.code === "Enter" || e.code === "NumpadEnter") && value) {
    addItem(value);
    this.value = ""; // 清空
  }
});

document.querySelector(".todo-list").addEventListener("click", function(e) {
  console.dir(e.target);
  if (e.target.className === "destroy") {
    removeItem(e.target);
  }
  if (e.target.className === "toggle") {
    changeCheckedItem(e.target);
  }
});

document.getElementById("toggle-all").addEventListener("click", function(e) {
  let isAllCompleted = TODOS.every(todo => todo.isCompleted);
  TODOS.forEach(v =>
    isAllCompleted ? (v.isCompleted = false) : (v.isCompleted = true)
  );
  renderTodoList();
});

function addItem(value) {
  let ul = document.querySelector(".todo-list");
  let dom = `<li>
    <div class="view">
      <input class="toggle" type="checkbox" />
      <label>${value}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template" />
  </li>;`;

  let li = createElementFromHTML(dom);
  ul.appendChild(li);
  let newTodoId = TODOS.length > 0 ? TODOS[TODOS.length - 1].id + 1 : 1;
  TODOS.push({
    id: newTodoId,
    name: value.trim(),
    isCompleted: false
  });
  console.log(TODOS);
}

function removeItem(Element) {
  var item = Element.parentNode.parentNode;
  item.parentNode.removeChild(item);
  TODOS.splice(TODOS.indexOf(item.value), 1);
  console.log(TODOS);
}

function changeCheckedItem(Element) {
  // label 节点的获取 不严谨？
  let value = Element.nextSibling.nextSibling.innerText.trim();
  let liIndex = TODOS.findIndex(v => v.name === value);
  TODOS[liIndex]["isCompleted"] = !TODOS[liIndex]["isCompleted"];
  console.log(TODOS);
}

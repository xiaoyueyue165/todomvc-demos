let TODOS = null;
axios("https://xiaoyueyue.org/todomvc-demos/static/data.json").then(result => {
  TODOS = result.data;
  // 1. 获取数据并显示到页面中
  renderTodoList();
});

function createElementFromHTML(htmlString) {
  var div = document.createElement("div");
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
}
// id: 1,isCompleted: true, name: "吃饭"

function renderTodoList(dataArr) {
  let data = dataArr || TODOS;
  let ul = document.querySelector(".todo-list");
  if (data.length === 0) {
    ul.innerHTML = "";
    return;
  }
  let fragment = document.createDocumentFragment();

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

  data.forEach(item => {
    let li_class = item.isCompleted ? "completed" : "";
    let input_checkedState = item.isCompleted ? "checked" : "";
    let dom = `<li class=${li_class}>
        <div class="view">
          <input class="toggle" type="checkbox" ${input_checkedState} />
          <label>${item.name}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value=${item.name} />
      </li>;`;

    let li = createElementFromHTML(dom);
    fragment.appendChild(li);
  });
  ul.innerHTML = "";
  ul.appendChild(fragment);
  _setCompuedTodosNumber(data);
}

// 2. 添加任务
document.querySelector(".new-todo").addEventListener("keydown", function(e) {
  var value = this.value;
  if ((e.code === "Enter" || e.code === "NumpadEnter") && value) {
    _addItem(value);
    _setCompuedTodosNumber();
    this.value = ""; // 清空
  }
});

document.querySelector(".todo-list").addEventListener("click", function(e) {
  console.dir(e.target);
  // 3. 删除任务（单个）
  if (e.target.className === "destroy") {
    _removeItem(e.target);
    _setCompuedTodosNumber();
  }
  // 4. 更改任务状态
  if (e.target.className === "toggle") {
    _changeCheckedItem(e.target);
    _setCompuedTodosNumber();
  }
});

// 5. 增加筛选
document.querySelector(".filters").addEventListener("click", function(e) {
  if (e.target.nodeName === "A") {
    Array.from(document.querySelectorAll(".filters a")).forEach(current => {
      // 选中状态
      e.target === current
        ? e.target.classList.add("selected")
        : current.classList.remove("selected");
    });
    // 重新渲染
    const TODOS_filtered = TODOS.filter(v => {
      if (e.target.classList.contains("active")) {
        return v.isCompleted === false;
      }
      if (e.target.classList.contains("completed")) {
        return v.isCompleted === true;
      }
      return v;
    });

    renderTodoList(TODOS_filtered);
  }
});

// 7. 清空已完成任务
document
  .querySelector(".clear-completed")
  .addEventListener("click", function(e) {
    const filter_result = TODOS.filter(v => v.isCompleted === false);
    renderTodoList(filter_result);
  });
// 8. 批量更改任务状态
document.getElementById("toggle-all").addEventListener("click", function(e) {
  let isAllCompleted = TODOS.every(todo => todo.isCompleted);
  TODOS.forEach(v =>
    isAllCompleted ? (v.isCompleted = false) : (v.isCompleted = true)
  );
  renderTodoList();
});
//  9. 修改任务名称
document.querySelector(".todo-list").addEventListener("dblclick", function(e) {
  if (e.target.nodeName === "LABEL") {
    _editModeStart(e.target);
  }
});
function _addItem(value) {
  let ul = document.querySelector(".todo-list");
  let dom = `<li>
    <div class="view">
      <input class="toggle" type="checkbox" />
      <label>${value}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value=${value} />
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

function _removeItem(Element) {
  var item = Element.parentNode.parentNode;
  item.parentNode.removeChild(item);
  TODOS.splice(TODOS.indexOf(item.value), 1);
  console.log(TODOS);
}

function _changeCheckedItem(Element) {
  // label 节点的获取 不严谨？
  let value = Element.nextSibling.nextSibling.innerText.trim();
  let liIndex = TODOS.findIndex(v => v.name === value);
  TODOS[liIndex]["isCompleted"] = !TODOS[liIndex]["isCompleted"];
  console.log(TODOS);
}

function _setCompuedTodosNumber(dataArr) {
  let data = dataArr || TODOS;
  const num = data.filter(v => v.isCompleted === false).length;
  document.querySelector(".todo-count strong").innerText = num;
}

function _editModeStart(target) {
  target.parentNode.setAttribute("style", "display:none !important");
  const editInput = target.parentNode.nextSibling.nextSibling;
  editInput.setAttribute("style", "display:block !important");
  editInput.focus();
  let oldValue = target.innerText.trim();
  let editResult = "";
  editInput.addEventListener("input", e => {
    editResult = e.target.value;
  });
  editInput.addEventListener("blur", e => {
    // 保存编辑
    target.innerText = editResult;
    // 更新至 TODOS
    let liIndex = TODOS.findIndex(v => v.name === oldValue);
    TODOS[liIndex]["name"] = editResult;
    // 退出编辑状态
    _editModeEnd(editInput);
  });
}

function _editModeEnd(input) {
  input.previousElementSibling.setAttribute("style", "display:block");
  input.removeAttribute("style");
}

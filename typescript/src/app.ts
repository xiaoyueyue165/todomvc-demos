let TODOS: TodoListType;

const initData = [
  {
    id: 1,
    name: "吃饭",
    isCompleted: true
  },
  {
    id: 2,
    name: "睡觉",
    isCompleted: false
  },
  {
    id: 3,
    name: "打豆豆",
    isCompleted: false
  }
];

TODOS = initData;
// 初始化
renderTodoList();

function createElementFromHTML(htmlString: string) {
  var div = document.createElement("div");
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
}

function renderTodoList(dataArr?: TodoListType) {
  let data = dataArr || TODOS;
  let ul = document.querySelector(".todo-list");
  if (data.length === 0) {
    ul.innerHTML = "";
    return;
  }
  let fragment = document.createDocumentFragment();

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
document
  .querySelector(".new-todo")
  // TODO: 找不到 e.code 对应的类型
  .addEventListener("keydown", function(e: any) {
    var value = this.value;
    if ((e.code === "Enter" || e.code === "NumpadEnter") && value) {
      _addItem(value);
      _setCompuedTodosNumber();
      this.value = ""; // 清空
    }
  });

document.querySelector(".todo-list").addEventListener("click", function(e) {
  const element = e.target as HTMLElement;
  // 3. 删除任务（单个）
  if (element.className === "destroy") {
    _removeItem(element);
    _setCompuedTodosNumber();
  }
  // 4. 更改任务状态
  if (element.className === "toggle") {
    _changeCheckedItem(e.target);
    _setCompuedTodosNumber();
  }
});

// 5. 增加筛选
document.querySelector(".filters").addEventListener("click", function(e) {
  const element = e.target as HTMLElement;
  if (element["nodeName"] === "A") {
    document.querySelectorAll(".filters a").forEach((current: any) => {
      // 选中状态
      e.target === current
        ? element.classList.add("selected")
        : current.classList.remove("selected");
    });
    // 重新渲染
    const TODOS_filtered = TODOS.filter(v => {
      if (element.classList.contains("active")) {
        return v.isCompleted === false;
      }
      if (element.classList.contains("completed")) {
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
  const element = e.target as HTMLElement;
  if (element.nodeName === "LABEL") {
    _editModeStart(element);
  }
});
function _addItem(value: string) {
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

function _removeItem(Element: HTMLElement) {
  var item: any = Element.parentNode.parentNode;
  item.parentNode.removeChild(item);
  TODOS.splice(TODOS.indexOf(item.value), 1);
  console.log(TODOS);
}

function _changeCheckedItem(Element: any) {
  // label 节点的获取 不严谨？
  let value = Element.nextSibling.nextSibling.innerText.trim();
  let liIndex = -1;
  TODOS.filter((v, i) => {
    v.name === value ? (liIndex = i) : "";
    return v.name === value;
  });

  console.log(liIndex);

  TODOS[liIndex]["isCompleted"] = !TODOS[liIndex]["isCompleted"];
  console.log(TODOS);
}

function _setCompuedTodosNumber(dataArr?: TodoListType) {
  let data = dataArr || TODOS;
  const num = data.filter(v => v.isCompleted === false).length;
  var dom = document.querySelector(".todo-count strong");
  const element = (dom as any) as HTMLElement; // ok
  element.innerText = String(num);
}

function _editModeStart(target: any) {
  target.parentNode.setAttribute("style", "display:none !important");
  const editInput = target.parentNode.nextSibling.nextSibling;
  editInput.setAttribute("style", "display:block !important");
  editInput.focus();
  let oldValue = target.innerText.trim();
  let editResult = "";
  editInput.addEventListener("input", (e: any) => {
    const element = e.target as HTMLInputElement;
    editResult = element.value;
  });
  editInput.addEventListener("blur", (e: Event) => {
    // 保存编辑
    target.innerText = editResult;
    // 更新至 TODOS
    let liIndex = -1;
    TODOS.filter((v, i) => {
      v.name === oldValue ? (liIndex = i) : "";
      return v.name === oldValue;
    });
    TODOS[liIndex]["name"] = editResult;
    // 退出编辑状态
    _editModeEnd(editInput);
  });
}

function _editModeEnd(input: any) {
  input.previousElementSibling.setAttribute("style", "display:block");
  input.removeAttribute("style");
}

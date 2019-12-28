var TODOS;
var initData = [
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
renderTodoList();
function createElementFromHTML(htmlString) {
    var div = document.createElement("div");
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}
function renderTodoList(dataArr) {
    var data = dataArr || TODOS;
    var ul = document.querySelector(".todo-list");
    if (data.length === 0) {
        ul.innerHTML = "";
        return;
    }
    var fragment = document.createDocumentFragment();
    data.forEach(function (item) {
        var li_class = item.isCompleted ? "completed" : "";
        var input_checkedState = item.isCompleted ? "checked" : "";
        var dom = "<li class=" + li_class + ">\n        <div class=\"view\">\n          <input class=\"toggle\" type=\"checkbox\" " + input_checkedState + " />\n          <label>" + item.name + "</label>\n          <button class=\"destroy\"></button>\n        </div>\n        <input class=\"edit\" value=" + item.name + " />\n      </li>;";
        var li = createElementFromHTML(dom);
        fragment.appendChild(li);
    });
    ul.innerHTML = "";
    ul.appendChild(fragment);
    _setCompuedTodosNumber(data);
}
document
    .querySelector(".new-todo")
    .addEventListener("keydown", function (e) {
    var value = this.value;
    if ((e.code === "Enter" || e.code === "NumpadEnter") && value) {
        _addItem(value);
        _setCompuedTodosNumber();
        this.value = "";
    }
});
document.querySelector(".todo-list").addEventListener("click", function (e) {
    var element = e.target;
    if (element.className === "destroy") {
        _removeItem(element);
        _setCompuedTodosNumber();
    }
    if (element.className === "toggle") {
        _changeCheckedItem(e.target);
        _setCompuedTodosNumber();
    }
});
document.querySelector(".filters").addEventListener("click", function (e) {
    var element = e.target;
    if (element["nodeName"] === "A") {
        document.querySelectorAll(".filters a").forEach(function (current) {
            e.target === current
                ? element.classList.add("selected")
                : current.classList.remove("selected");
        });
        var TODOS_filtered = TODOS.filter(function (v) {
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
document
    .querySelector(".clear-completed")
    .addEventListener("click", function (e) {
    var filter_result = TODOS.filter(function (v) { return v.isCompleted === false; });
    renderTodoList(filter_result);
});
document.getElementById("toggle-all").addEventListener("click", function (e) {
    var isAllCompleted = TODOS.every(function (todo) { return todo.isCompleted; });
    TODOS.forEach(function (v) {
        return isAllCompleted ? (v.isCompleted = false) : (v.isCompleted = true);
    });
    renderTodoList();
});
document.querySelector(".todo-list").addEventListener("dblclick", function (e) {
    var element = e.target;
    if (element.nodeName === "LABEL") {
        _editModeStart(element);
    }
});
function _addItem(value) {
    var ul = document.querySelector(".todo-list");
    var dom = "<li>\n    <div class=\"view\">\n      <input class=\"toggle\" type=\"checkbox\" />\n      <label>" + value + "</label>\n      <button class=\"destroy\"></button>\n    </div>\n    <input class=\"edit\" value=" + value + " />\n  </li>;";
    var li = createElementFromHTML(dom);
    ul.appendChild(li);
    var newTodoId = TODOS.length > 0 ? TODOS[TODOS.length - 1].id + 1 : 1;
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
    var value = Element.nextSibling.nextSibling.innerText.trim();
    var liIndex = -1;
    TODOS.filter(function (v, i) {
        v.name === value ? (liIndex = i) : "";
        return v.name === value;
    });
    console.log(liIndex);
    TODOS[liIndex]["isCompleted"] = !TODOS[liIndex]["isCompleted"];
    console.log(TODOS);
}
function _setCompuedTodosNumber(dataArr) {
    var data = dataArr || TODOS;
    var num = data.filter(function (v) { return v.isCompleted === false; }).length;
    var dom = document.querySelector(".todo-count strong");
    var element = dom;
    element.innerText = String(num);
}
function _editModeStart(target) {
    target.parentNode.setAttribute("style", "display:none !important");
    var editInput = target.parentNode.nextSibling.nextSibling;
    editInput.setAttribute("style", "display:block !important");
    editInput.focus();
    var oldValue = target.innerText.trim();
    var editResult = "";
    editInput.addEventListener("input", function (e) {
        var element = e.target;
        editResult = element.value;
    });
    editInput.addEventListener("blur", function (e) {
        target.innerText = editResult;
        var liIndex = -1;
        TODOS.filter(function (v, i) {
            v.name === oldValue ? (liIndex = i) : "";
            return v.name === oldValue;
        });
        TODOS[liIndex]["name"] = editResult;
        _editModeEnd(editInput);
    });
}
function _editModeEnd(input) {
    input.previousElementSibling.setAttribute("style", "display:block");
    input.removeAttribute("style");
}
//# sourceMappingURL=app.js.map
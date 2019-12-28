(function(t){function e(e){for(var r,s,c=e[0],l=e[1],a=e[2],u=0,f=[];u<c.length;u++)s=c[u],Object.prototype.hasOwnProperty.call(n,s)&&n[s]&&f.push(n[s][0]),n[s]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(t[r]=l[r]);d&&d(e);while(f.length)f.shift()();return i.push.apply(i,a||[]),o()}function o(){for(var t,e=0;e<i.length;e++){for(var o=i[e],r=!0,c=1;c<o.length;c++){var l=o[c];0!==n[l]&&(r=!1)}r&&(i.splice(e--,1),t=s(s.s=o[0]))}return t}var r={},n={app:0},i=[];function s(e){if(r[e])return r[e].exports;var o=r[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,s),o.l=!0,o.exports}s.m=t,s.c=r,s.d=function(t,e,o){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(s.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(o,r,function(e){return t[e]}.bind(null,r));return o},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],l=c.push.bind(c);c.push=e,c=c.slice();for(var a=0;a<c.length;a++)e(c[a]);var d=l;i.push([0,"chunk-vendors"]),o()})({0:function(t,e,o){t.exports=o("56d7")},"2d1c":function(t,e,o){},"43c9":function(t,e,o){},"56d7":function(t,e,o){"use strict";o.r(e);o("e260"),o("e6cf"),o("cca6"),o("a79d");var r=o("2b0e"),n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"app"}},[o("TodoList")],1)},i=[],s=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("section",{staticClass:"todoapp"},[o("header",{staticClass:"header"},[o("h1",[t._v("todos")]),o("input",{staticClass:"new-todo",attrs:{placeholder:"What needs to be done?",autofocus:""},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.addTodo(e)}}})]),o("section",{staticClass:"main"},[o("input",{staticClass:"toggle-all",attrs:{id:"toggle-all",type:"checkbox"},on:{click:t.toggleAllCompletedTodos}}),o("label",{attrs:{for:"toggle-all"}},[t._v("Mark all as complete")]),t.todos_loading?o("ul",{staticClass:"todo-list"},[o("li",[o("div",{staticClass:"view",style:{textAlign:"center",height:"58px",lineHeight:"58px"}},[t._v(" loading... ")])])]):t._e(),t.todos_error?o("ul",{staticClass:"todo-list"},[o("li",[o("div",{staticClass:"view",style:{textAlign:"center",height:"58px",lineHeight:"58px"}},[t._v(" "+t._s(t.todos_error)+" ")])])]):t._e(),t.todos_loading||null!==t.todos_error?t._e():o("TodoItems",{attrs:{data:t.filteredTodos},on:{edit:t.editTodoById,editClose:t.editFinished}})],1),o("footer",{staticClass:"footer"},[o("span",{staticClass:"todo-count"},[o("strong",[t._v(t._s(t.notFinshTodoCount))]),t._v(" item left ")]),o("TodoFilter")],1)])},c=[],l=(o("a4d3"),o("4de4"),o("c740"),o("4160"),o("e439"),o("dbb4"),o("b64b"),o("159b"),o("2fa7")),a=o("2f62"),d=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("ul",{staticClass:"todo-list"},t._l(t.data,(function(e){return o("li",{key:e.id,staticClass:"[item.isCompleted ? 'completed':'']"},[!1===e.isEdit?o("div",{staticClass:"view"},[o("input",{directives:[{name:"model",rawName:"v-model",value:e.isCompleted,expression:"item.isCompleted"}],staticClass:"toggle",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.isCompleted)?t._i(e.isCompleted,null)>-1:e.isCompleted},on:{change:function(o){var r=e.isCompleted,n=o.target,i=!!n.checked;if(Array.isArray(r)){var s=null,c=t._i(r,s);n.checked?c<0&&t.$set(e,"isCompleted",r.concat([s])):c>-1&&t.$set(e,"isCompleted",r.slice(0,c).concat(r.slice(c+1)))}else t.$set(e,"isCompleted",i)}}}),o("label",{on:{dblclick:function(o){return t.changeToEditState(e.id)}}},[t._v(t._s(e.name))]),o("button",{staticClass:"destroy",on:{click:function(o){return t.deleteTodo(e.id)}}})]):!0===e.isEdit?o("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"item.name"}],staticClass:"edit",style:{display:"block"},domProps:{value:e.name},on:{blur:function(o){return t.finishedEdit(e.id)},input:function(o){o.target.composing||t.$set(e,"name",o.target.value)}}}):t._e()])})),0)},u=[];function f(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,r)}return o}function p(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?f(o,!0).forEach((function(e){Object(l["a"])(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):f(o).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}var m={name:"TodoItem",props:{data:{type:Array,require:!0}},methods:p({},Object(a["b"])(["deleteTodo"]),{changeToEditState:function(t){this.$emit("edit",t)},finishedEdit:function(t){this.$emit("editClose",t)}})},b=m,h=o("2877"),y=Object(h["a"])(b,d,u,!1,null,"48798a5e",null),O=y.exports,g=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("ul",{staticClass:"filters"},t._l(t.states,(function(e){return o("li",{key:e,on:{click:function(o){return t.setTodoFilter(e)}}},[o("a",{class:[e===t.filterTodoKeyWord?"selected":""]},[t._v(t._s(e[0].toUpperCase()+e.slice(1)))])])})),0),o("button",{staticClass:"clear-completed",on:{click:t.clearAllCompleted}},[t._v(" Clear completed ")])])},v=[];function _(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,r)}return o}function C(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?_(o,!0).forEach((function(e){Object(l["a"])(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):_(o).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}var T={name:"TodoFilter",data:function(){return{states:["all","active","completed"]}},computed:C({},Object(a["c"])(["filterTodoKeyWord"])),methods:C({},Object(a["b"])(["setTodoFilter","clearAllCompleted"]))},j=T,w=Object(h["a"])(j,g,v,!1,null,"7fe139fc",null),P=w.exports;function E(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,r)}return o}function S(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?E(o,!0).forEach((function(e){Object(l["a"])(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):E(o).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}var x={name:"TodoList",components:{TodoItems:O,TodoFilter:P},computed:S({},Object(a["c"])(["todos","todos_loading","todos_error","filterTodoKeyWord"]),{notFinshTodoCount:function(){return this.todos.filter((function(t){return!t.isCompleted})).length},filteredTodos:function(){return"active"===this.filterTodoKeyWord?this.todos.filter((function(t){return!t.isCompleted})):"completed"===this.filterTodoKeyWord?this.todos.filter((function(t){return t.isCompleted})):this.todos}}),methods:S({},Object(a["b"])(["addTodo","toggleAllCompletedTodos"]),{editTodoById:function(t){var e=this.todos.findIndex((function(e){return e.id===t}));this.todos[e].isEdit=!0},editFinished:function(t){var e=this.todos.findIndex((function(e){return e.id===t}));this.todos[e].isEdit=!1}}),mounted:function(){this.$store.dispatch("fetchTodos")}},k=x,D=Object(h["a"])(k,s,c,!1,null,"2fe74af6",null),A=D.exports,F={name:"app",components:{TodoList:A}},$=F,I=Object(h["a"])($,n,i,!1,null,null,null),W=I.exports,K={todos_loading:!0,todos_error:null,todos:[],filterTodoKeyWord:"all"},U=(o("a623"),o("498a"),{TODOS_REQUEST:function(t){t.todos_loading=!0},TODOS_SUCCESS:function(t,e){t.todos_loading=!1,t.todos=e},TODOS_FAILURE:function(t,e){t.todos_loading=!1,t.todos_error=e},addTodo:function(t,e){e.target.value.trim()?(t.todos.push({id:t.todos[t.todos.length-1].id+1,name:e.target.value.trim(),isCompleted:!1,isEdit:!1}),e.target.value=""):alert("Todo 内容不能为空哦")},deleteTodo:function(t,e){t.todos=t.todos.filter((function(t){return t.id!==e}))},setTodoFilter:function(t,e){t.filterTodoKeyWord=e},clearAllCompleted:function(t){t.todos=t.todos.filter((function(t){return!t.isCompleted}))},toggleAllCompletedTodos:function(t){var e=t.todos.every((function(t){return t.isCompleted}));t.todos.forEach((function(t){return t.isCompleted=!e}))}}),R=(o("d3b7"),o("96cf"),o("bc3a")),L=o.n(R),M={fetchTodos:function(t){function e(){return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,regeneratorRuntime.awrap(L()("https://xiaoyueyue.org/todomvc-demos/static/data.json").then((function(e){e.data.forEach((function(t){t.isEdit=!1})),t.commit("TODOS_SUCCESS",e.data)})).catch((function(e){t.commit("TODOS_FAILURE",e)})));case 2:case"end":return e.stop()}}))}t.commit("TODOS_REQUEST"),e()}};r["a"].use(a["a"]);var B=new a["a"].Store({state:K,mutations:U,actions:M});o("2d1c"),o("cf03"),o("43c9");r["a"].config.productionTip=!1,new r["a"]({render:function(t){return t(W)},store:B}).$mount("#app")},cf03:function(t,e,o){}});
//# sourceMappingURL=app.aa788fbb.js.map
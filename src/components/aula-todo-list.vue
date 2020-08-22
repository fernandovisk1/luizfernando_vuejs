<template>
<div id="todo-list">
  <form @submit.prevent='$_AddListTodo'>
    <input type = "text" v-model = "input"/>
    <button type = "submit">Adicionar</button>
  </form>
  <ul id="todos">
    <template v-for='(todo, index) in todolist'>
      <li :key= 'todo.id'>
        <label>
          {{index + 1}} - {{ todo.description }}
         <input type= 'checkbox' v-model='todo.checkbox' @change="$_InputChanged(index)">
        </label>
      </li>
  </template>
  </ul>
</div>
</template>
<script>
function getListFromStorage() {
  return JSON.parse(
    localStorage.getItem('todo-list'),
  ) ?? [];
}

function saveListInStorage(list) {
  localStorage.setItem(
    'todo-list',
    JSON.stringify(list),
  );
}

export default {
  name: 'aula-todolist',

  data() {
    return {
      input: null,
      todolist: getListFromStorage(),
    };
  },

  methods: {
    $_AddListTodo() {
      console.log(this.todolist, this.todolist.Length);
      this.todolist.push({
        id: this.todolist ? this.todolist.length + 1 : 1,
        data: Date.now(),
        description: this.input,
        checked: false,
      });

      this.input = null;
      saveListInStorage(this.todolist);
    },

    $_InputChanged(index) {
      this.todolist[index].checked = !this.todolist[index].checked;
      saveListInStorage(this.todolist);
    },
  },
};

</script>

<style scoped>
#todo-list {
  --primary-color: #2196F3;
  --primary-color-light: #64B5F6;
  --primary-color-dark: #1976D2;
  --input-height: 50px;
}

form {
  display: flex;
  flex-direction: row;

  width: 40%;
  padding: 6px;
}

form > input {
  flex: 1;

  outline: none;
  padding: 0 16px;

  height: var(--input-height);
  border: 1px solid var(--primary-color);

  border-top-left-radius: calc(var(--input-height) / 2);
  border-bottom-left-radius: calc(var(--input-height) / 2);

  border-right: none;
  transition: all 0.2s ease-in-out;
}

form > button {
  flex: 0;

  color: white;

  outline: none;
  padding: 0 16px;
  cursor: pointer;

  height: var(--input-height);
  border: 1px solid var(--primary-color);

  border-top-right-radius: calc(var(--input-height) / 2);
  border-bottom-right-radius: calc(var(--input-height) / 2);

  background-color: var(--primary-color);

  transition: all 0.2s ease-in-out;
}
form > button:hover {
  border-color: var(--primary-color-light);
  background-color: var(--primary-color-light);
}
form > button:active {
  border-color: var(--primary-color-dark);
  background-color: var(--primary-color-dark);
}

ul {
  display: block;
  list-style: none;

  margin: 0;
  padding: 8px;
}

ul > li {
  display: block;

  padding: 16px;
  cursor: pointer;

  background-color: white;
  border-radius: calc(var(--input-height) / 2);
  box-shadow:
    0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);

  transition: box-shadow 0.2s ease-in-out;
}
ul > li:hover {
  box-shadow:
    0 5px 5px -3px rgba(0, 0, 0, 0.2),
    0 8px 10px 1px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12);
}

ul > li > label {
  display: flex;
  justify-content: space-between;
}

</style>

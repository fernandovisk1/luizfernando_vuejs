<template>
<div id="todo-list">
    <form @submit.prevent="$_onAddTodo">
        <input type="text" v-model="input"/>
        <button type="submit">Adicionar</button>
    </form>

    <h3>Em Progresso</h3>
    <ul id="todos">
        <template v-for="todoItem in todoList">
            <aulatodolistItem :key="todoItem.id" :todo="todoItem"/>
        <!--<li :key="todo.id">
            <label>
                {{ todo.description }}
                <input type="checkbox" v-model="todo.checked"/>
            </label>
        </li>-->
        </template>
    </ul>

</div>
</template>

<script>
import aulatodolistItem from './aula-todo-list-item.vue';

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
  name: 'aulatodolist',

  components: {
      aulatodolistItem,
  },

  data() {
    return {
      input: null,
      todoList: getListFromStorage(),
    };
  },

  methods: {
    $_onAddTodo() {
      this.todoList.push({
        id: Date.now(),
        description: this.input,
        checked: false,
      });
      this.input = null;

      saveListInStorage(this.todoList);
    },
    
    $_onChangeTodoChecked(todoId) { 
        const todo = this.todolist.find(({ id }) => id === todoId);
        if (!todo) return;
        
        todo.checked = !todo.checked;

        saveListInStorage(this.todoList);

    //    this.$nextTick(() == { 
    //        saveListInStorage(this.todoList);
    //});
    },
  },

  created(){
      window.addEventListener('storage', () =>{
          this.todoList = getListFromStorage();
      });
  },
};
</script>
<style scoped>
#todo-list {
  --primary-color: #2196F3;
  --primary-color-light: #64B5F6;
  --primary-color-dark: #1976D2;

  --input-height: 32px;
}

form {
  display: flex;
  flex-direction: row;

  width: 100%;
  padding: 8px;
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

<template>
  <div id="todo-list">
   <form @submit.prevent='$_AddListTodo'>
    <input type = "text" v-model = "input"/>
    <button type = "submit">Adicionar</button>
   </form>
    <div id = "todo">
        <h1>Em espera</h1>
        <ul id="emespera">
          <template v-for="todo in waitinglist" >
             <listitem
               :key="`${todo.id}-${todo.checked}`"
               :item="todo"
               @input= "$_InputChanged" />
          </template>
        </ul>
        <h1>Confirmados</h1>
        <ul id="confirmado">
          <template v-for="todo in confirmedlist" >
             <listitem
               :key="`${todo.id}-${todo.checked}`"
               :item="todo"
               @input= "$_InputChanged" />
          </template>
        </ul>
    </div>
 </div>
</template>
<script>
import listitem from './aula-todolistitem.vue'; 

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
  components: { 
    listitem,
  },
  data() {
    return {
      input: null,
      lista: getListFromStorage(),
    };
  },
  computed: {
    waitinglist() {
      return this.lista
        .filter(({ checked }) => !checked);
    },
    confirmedlist() {
      return this.lista
        .filter(({ checked }) => !!checked);
    },
  },
  methods: {
    $_AddListTodo() {
      console.log(this.lista, this.lista.Length);
      this.lista.push({
        id: this.lista ? this.lista.length + 1 : 1,
        data: Date.now(),
        description: this.input,
        checked: false,
      });
      this.input = null;
      saveListInStorage(this.lista);
    },
    $_InputChanged(todo) {
      const index = this.lista.findIndex(({ id }) => id === todo.id);
      if (index < 0) {
        return;
      }
      this.$set(this.lista, index, todo);
      saveListInStorage(this.lista);
    },
  },

  created() {
    window.addEventListener('storage', () => {
      this.lista = getListFromStorage();
    });
  },
};
</script>
<style scoped>
#todo-list {
  --primary-color: #2196F3;
  --primary-color-light: #64B5F6;
  --primary-color-dark: #1976D2;
  --input-height: 30px;
}

form {
  display: flex;
  flex-direction: row;
  width: 100%;
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
</style>

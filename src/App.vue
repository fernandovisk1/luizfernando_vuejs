<template>
   <div id="todo-list">
    <aulaalert/>
     
    <aulaform @addform="$_AddListTodo"/>
      <template v-if= "!$_unchecked.lenght && !$_checked.length" >
        <h1> Add um novo Todo</h1>
      </template>

      <template v-if="$_unchecked.length > 0">
        <aulatodo  :listatodo = "$_unchecked"  @change:item ="$_InputChanged">
          <template #header> Lista Aberta</template>
          <template #footer= "{ quantidade }">
            <div style="text-align: right;">
              Total: {{ quantidade}} itens
            </div>
          </template>
        </aulatodo>
      </template>

       <template v-if="$_checked.length > 0">
        <aulatodo  :listatodo = "$_checked"  @change:item ="$_InputChanged">
          <template #header> Lista Fechados</template>
          <template #footer= "{ quantidade }">
            <div style="text-align: right;">
              Total: {{ quantidade}} itens
            </div>
          </template>
        </aulatodo>
      </template>

   </div>
</template>

<script>
import aulatodo from './components/aula-todo.vue';
import aulaform from './components/aula-todoform.vue';
import aulaalert from './components/aula-alert.vue';

// storage  - hospedeiro
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
  name: 'todo-list',
  components: {
    aulatodo,
    aulaform,
    aulaalert,
  },

  data() {
    return {
      lista: getListFromStorage(),
    };
  },
  computed: {
    $_unchecked() {
      return this.lista
        .filter((item) => !item.checked);
    },
    $_checked() {
      return this.lista
        .filter((item) => item.checked);
    },
    $_showList() {
      return this.lista.length > 0;
    },
  },
  methods: {
    $_AddListTodo(nomeItem) {
      this.lista.push({
        id: this.lista ? this.lista.length + 1 : 1,
        data: Date.now(),
        description: nomeItem,
        checked: false,
      });
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
  // evento  - captura ação - click
  created() {
    window.addEventListener('storage', () => {
      this.lista = getListFromStorage();
    });
  },
};
</script>
<style>
*{
  box-sizing: border-box;
}
  :root {
    --primary-color: #2196F3;
    --primary-color-light: #64B5F6;
    --primary-color-dark: #1976D2;
    --input-height: 32px;
  }
</style>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
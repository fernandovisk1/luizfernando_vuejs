<template>
   <div id="todo-list">
    <form @submit.prevent='$_AddListTodo'>
      <input type = "text" v-model = "input"/>
    <button type = "submit"> Adicionar </button>
    </form>
   </div>
</template>
<script>
export default {
  name: 'aulaform',

  data() {
    return {
      input: '',
    };
  },

  methods: {
    $_AddListTodo() {
      console.log('add list todo ', this.input);

      this.$emit('addform', this.input);
      this.input = '';
    },
  },
};
</script>

<style scoped>

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
</style>

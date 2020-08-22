<template>
     <div id = "todo">
         <h3> <slot name="header"/> </h3>
         <ul id="confirmado">
          <template v-for="todo in $_Imprimelist" >
             <listitem
               :key="`${todo.id}-${todo.checked}`"
               :item="todo"
               @input= "$_InputChanged" />
          </template>
        </ul>
        <slot name="footer" :quantidade="$_Imprimelist.length" />
    </div>
</template>
<script>
import listitem from './aula-todo-list-item.vue'; // para componente

export default {
  name: 'aula-todolist',
  components: { // COMPONENTE
    listitem,
  },

  props: {
    listatodo: Array,
  },
  computed: {
    $_Imprimelist() {
      return this.listatodo ?? [];
    },
  },
  methods: {
    $_InputChanged(todo) {
      this.$emit('change:item', todo);
    },
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

ul {
  display: block;
  list-style: none;
  margin: 0;
  padding: 8px;
}
</style>

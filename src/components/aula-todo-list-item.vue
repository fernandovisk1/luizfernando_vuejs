<template>
  <li>
    <label>
   {{$_Index }} - {{$_description }}
      <input
        type="checkbox"
        :checked="$_Checked"
        @change=$_OnChangeCheck()
        />
       </label>
  </li>
</template>

<script>
export default {
  name: 'aula-todo-list-item',
  props: {
    item: Object, 
  },
  computed: {
    $_Index() {
      return this.item?.id;
    },
    $_description() {
      return this.item?.description;
    },
    $_Checked() {
      return this.item?.checked;
    },
  },
  methods: {
    $_OnChangeCheck() {
      this.$emit('input', {
        ...this.item,
        checked: !this.item.checked,
      });
    },
  },
};
</script>
<style scoped>
 li {
  display: block;
  padding: 12px;
  cursor: pointer;

  background-color: white;
  border-radius: calc(var(--input-height) / 2);
  box-shadow:
    0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);

  transition: box-shadow 0.2s ease-in-out;
}
li:hover {
  box-shadow:
    0 5px 5px -3px rgba(0, 0, 0, 0.2),
    0 8px 10px 1px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12);
}

li > label {
  display: flex;
  justify-content: space-between;
}
</style>

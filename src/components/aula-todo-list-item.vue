<template>
  <li>
    <label>
      {{$_Index }} - {{$_description }}

        <div>
          {{ $_Data | date}}
        </div>
  
      <input
        type="checkbox"
        :checked="$_Checked"
        @change=$_OnChangeCheck()
      />
    </label>
  </li>
</template>

<script>
import dateFilter from '../filters/date.js';

export default {
  name: 'aula-todo-list-item',

  filters: {
    date: dateFilter,
  },

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
    $_created() {
      return dateFilter(this.value?.created);
    },
    $_Data() {
      return this.item?.data;
    },
  },
  methods: {
    $_OnChangeCheck() {
      this.$emit('input', {
        ...this.item,
        checked: !this.item.checked,
        data: Date.now(),
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

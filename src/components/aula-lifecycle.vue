<template>
  <div id="app">
      <p>{{varteste1+varteste2}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      varteste1: 'Vue',
      varteste2: 'Js',
    };
  },

  methods: {
    exibenome() {
      this.varteste1 = '1';
      this.varteste2 = '2';
    },
  },

  watch: {
    Exibe(val) {
      console.log(val);
      this.Exibe();
    },
  },

  created() {
    this.varteste1 = 'TESTE MSG';
  },
};
</script>

<style>

</style>
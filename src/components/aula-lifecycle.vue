<template>
  <div id="app">
      <p>{{varnome1+varnome2}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      varnome1: 'Vue',
      varnome2: 'Js',
    };
  },

  methods: {
    exibenome() {
      this.varnome1 = '1';
      this.varnome2 = '2';
    },
  },

  watch: {
    Exibe(val) {
      console.log(val);
      this.Exibe();
    },
  },

  created() {
    this.varnome1 = 'teste';
  },
};
</script>

<style>

</style>
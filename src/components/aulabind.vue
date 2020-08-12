<template>
  <div @click="$_onTemplateClick">
    <div>{{ nome }}</div>
    <div v-text="nome" />
    <div v-html="nome" />

    <div
      class="square"

      :class="{
        'square--red': squareRed,
        'square--blue': !squareRed,
      }"

      :style="{
        borderStyle: squareRed ? 'dashed' : 'solid',
      }"

      @click.stop="$_onSquareClick"
    />

    <a href="http://google.com.br" target="_blank" @click.stop.prevent="$_vamosParaGoogle">Vamos para o Google</a>
    <br><br>

    {{ input.value }}
    <form @submit.prevent="$_onFormSubmit">
      <input
        :type="input.type"
        v-model="input.value"
        @keypress.enter="$_onInputKeypress" />
    </form>
  </div>
</template>

<script>
export default {
  name: 'aulabind',

  data() {
    return {
      nome: '<b>Fernando Franco</b>',
      squareRed: false,

      input: {
        type: 'password',
        value: null,
      },
    };
  },

  methods: {
    $_onSquareClick() {
      this.input.type = this.input.type === 'text' ? 'password' : 'text';
      this.squareRed = this.input.type === 'text';
    },

    $_onTemplateClick() {
      console.log('TEMPLATE CLICK');
    },

    $_onFormSubmit() {
      console.log('SUBMIT FORM');
    },

    $_vamosParaGoogle() {
      console.log('BORA PARA O GOOGLE');
    },

    $_onInputKeypress($event) {
      console.log('KEY', $event.key);
    },
  },
};
</script>

<style>
.square {
  width: 64px;
  height: 64px;
  border: 8px solid #212121;
}

.square--red {
  border-color: red;
}

.square--blue {
  border-color: blue;
}
</style>

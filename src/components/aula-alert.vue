<template>
  <div v-if="show" id="alert">
    {{ message }}

    <button
      v-if="button"
      @click="$_onClickButton"
    >
      {{ button.text }}
    </button>
  </div>
</template>

<script>
import AlertEvent from '../events/AlertEvent';

export default {
  name: 'aula-alert',

  data() {
    return {
      show: false,
      message: 'null',
      button: null,
    };
  },

  methods: {
    $_addButton(button) {
      if (!button?.text) {
        throw new Error('Required text in alert button');
      }

      this.button = {
        text: button?.text,
        handler: button?.handler,
      };
    },

    $_handler(event) {
      if (!event?.detail?.message) {
        throw new Error('Required message in alert event');
      }

      this.message = event?.detail?.message;

      if (event?.detail?.button) {
        this.$_addButton(event?.detail?.button);
      }

      this.show = true;

      this.$_timeout = setTimeout(() => {
        this.show = false;
      }, 6000);
    },

    $_onClickButton($event) {
      clearTimeout(this.$_timeout);
      this.show = false;

      if (this.button?.handler) {
        this.button.handler($event);
      }
    },
  },

  created() {
    document.addEventListener(
      AlertEvent.EVENT,
      this.$_handler,
    );
  },
};
</script>

<style>
#alert {
  padding: 8px 16px;
  border-radius: 8px;

  color: white;
  background-color: #212121;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
#alert > button {
  margin: 0;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 8px;

  border: none;
  outline: none;
  color: var(--primary-color);
  background-color: transparent;
}
#alert > button:hover {
  color: white;
  background-color: var(--primary-color);
}
#alert > button:active {
  background-color: var(--primary-color-dark);
}
</style>

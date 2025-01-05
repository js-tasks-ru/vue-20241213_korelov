import { defineComponent, createApp } from 'vue';

const App = defineComponent({
  name: 'App',
  setup() {
    const getDate = () => {
      return new Date().toLocaleDateString('En-en', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    };

    return {
      today: getDate(),
    };
  },

  template: /* html */`<div>Сегодня {{today}}</div>`,
});

createApp(App).mount('#app');

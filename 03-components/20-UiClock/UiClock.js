import { ref, onMounted, onUnmounted, defineComponent } from 'vue';

export default defineComponent({
  name: 'UiClock',

  setup() {
    const getTime = (date = new Date()) => {
      const formatter = new Intl.DateTimeFormat(
        navigator.language,
        {
          timeStyle: 'medium'
        },
      );

      return formatter.format(date);
    };

    const time = ref(getTime());
    let delay = 0;
    let timer = null;

    const updateTime = () => {
      const date = new Date();
      delay = 1000 - date.getMilliseconds();
      time.value = getTime(date);

      timer = setTimeout(updateTime, delay);
    };

    onMounted(() => {
      updateTime();
    });

    onUnmounted(() => {
      clearTimeout(timer);
    });

    return {
      time,
    };
  },

  template: /* html */ `<div class="clock">{{ time }}</div>`,
});

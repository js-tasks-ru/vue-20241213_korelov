import { defineComponent, ref, unref, computed } from 'vue'

export default defineComponent({
  name: 'MapApp',

  setup() {
    // Реактивные переменные для хранения координат метки
    const x = ref(0);
    const y = ref(0);

    const top = computed(() => `${unref(y)}px`);
    const left = computed(() => `${unref(x)}px`);

    /**
     * Обработчик клика по карте для установки координат метки
     * @param {MouseEvent} event
     */
    function handleClick(event) {
      x.value = event.offsetX;
      y.value = event.offsetY;
    }

    return {
      x,
      y,
      top,
      left,
      handleClick,
    }
  },

  template: /* html */ `
    <div class="map" @click="handleClick">
      <img class="map-image" src="./map.png" alt="Map" draggable="false" />
      <span class="pin" :style="{color: 'red', top: top, left: left}">📍</span>
    </div>
  `,
})

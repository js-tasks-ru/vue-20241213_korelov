import { defineComponent } from 'vue';
import WeatherItem from '../WeatherItem/WeatherItem';

export default defineComponent({
  name: 'WeatherList',

  components: {
    WeatherItem,
  },

  props: {
    cards: {
      type: Array,
      required: true,
    },
  },

  template: /* html */ `
    <ul class="weather-list unstyled-list">
      <WeatherItem v-for="(card, index) in cards" :key="index" :card="card" />
    </ul>
  `,
});

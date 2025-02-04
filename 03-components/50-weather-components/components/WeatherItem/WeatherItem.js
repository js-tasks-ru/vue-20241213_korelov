import { defineComponent } from 'vue';

export default defineComponent({
  name: 'WeatherItem',

  props: {
    card: {
      type: Object,
      required: true,
    },
  },

  template: /* html */ `
    <li class="weather-card" :class="{'weather-card--night': card.current.isNight}">
      <template v-if="card.alert">
        <div class="weather-alert">
          <span class="weather-alert__icon">⚠️</span>
          <span class="weather-alert__description">{{ card.alert.sender_name }}: {{ card.alert.description }}</span>
        </div>
      </template>
      <div>
        <h2 class="weather-card__name">
          {{ card.geographic_name }}
        </h2>
        <div class="weather-card__time">
          {{ card.current.dt }}
        </div>
      </div>
      <div class="weather-conditions">
        <div class="weather-conditions__icon" :title="card.current.weather.description">{{ card.current.weather.icon }}</div>
        <div class="weather-conditions__temp">{{ card.current.tempC }} °C</div>
      </div>
      <div class="weather-details">
        <div class="weather-details__item">
          <div class="weather-details__item-label">Давление, мм рт. ст.</div>
          <div class="weather-details__item-value">{{ card.current.pressureMm }}</div>
        </div>
        <div class="weather-details__item">
          <div class="weather-details__item-label">Влажность, %</div>
          <div class="weather-details__item-value">{{ card.current.humidity }}</div>
        </div>
        <div class="weather-details__item">
          <div class="weather-details__item-label">Облачность, %</div>
          <div class="weather-details__item-value">{{ card.current.clouds }}</div>
        </div>
        <div class="weather-details__item">
          <div class="weather-details__item-label">Ветер, м/с</div>
          <div class="weather-details__item-value">{{ card.current.wind_speed }}</div>
        </div>
      </div>
    </li>
  `,
});

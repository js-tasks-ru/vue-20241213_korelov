import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',
  setup() {
    const getTimestamp = (time) => {
      return new Date(`1970-01-01T${time}:00`);
    }

    const getIsNight = (nowTime, sunriseTime, sunsetTime) => {
      const nowTimestamp = getTimestamp(nowTime);
      const sunriseTimestamp = getTimestamp(sunriseTime);
      const sunsetTimestamp = getTimestamp(sunsetTime);

      return nowTimestamp < sunriseTimestamp || nowTimestamp > sunsetTimestamp;
    };

    const cards = JSON.parse(JSON.stringify(getWeatherData()))
      .map((card) => {
        const { current } = card;
        const { dt, sunrise, sunset, temp, weather, pressure } = current;

        card.current.tempC = (temp - 273.15).toFixed(1);
        card.current.weather.icon = WeatherConditionIcons[weather.id];
        card.current.pressureMm = Math.round(pressure * 0.75);
        card.current.isNight = getIsNight(dt, sunrise, sunset);

        return card;
      });

    return {
      cards,
    }
  },

  template: /* html */`
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <template v-for="(card, index) in cards" :key="index">
          <li class="weather-card" :class="{'weather-card--night': card.current.isNight}">
            <template v-if="card.alert">
              <div class="weather-alert">
                <span class="weather-alert__icon">⚠️</span>
                <span class="weather-alert__description">{{card.alert.sender_name}}: {{card.alert.description}}</span>
              </div>
            </template>
            <div>
              <h2 class="weather-card__name">
                {{card.geographic_name}}
              </h2>
              <div class="weather-card__time">
                {{card.current.dt}}
              </div>
            </div>
            <div class="weather-conditions">
              <div class="weather-conditions__icon" :title="card.current.weather.description">{{card.current.weather.icon}}</div>
              <div class="weather-conditions__temp">{{card.current.tempC}} °C</div>
            </div>
            <div class="weather-details">
              <div class="weather-details__item">
                <div class="weather-details__item-label">Давление, мм рт. ст.</div>
                <div class="weather-details__item-value">{{card.current.pressureMm}}</div>
              </div>
              <div class="weather-details__item">
                <div class="weather-details__item-label">Влажность, %</div>
                <div class="weather-details__item-value">{{card.current.humidity}}</div>
              </div>
              <div class="weather-details__item">
                <div class="weather-details__item-label">Облачность, %</div>
                <div class="weather-details__item-value">{{card.current.clouds}}</div>
              </div>
              <div class="weather-details__item">
                <div class="weather-details__item-label">Ветер, м/с</div>
                <div class="weather-details__item-value">{{card.current.wind_speed}}</div>
              </div>
            </div>
          </li>
        </template>
      </ul>
    </div>
  `,
})

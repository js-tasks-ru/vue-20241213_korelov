
import { defineComponent } from 'vue';
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts';
import './WeatherApp.css';
import WeatherList from './components/WeatherList/WeatherList.js';

export default defineComponent({
  name: 'WeatherApp',

  components: {
    WeatherList,
  },

  setup() {
    const getTimestamp = (time) => {
      return new Date(`1970-01-01T${time}:00`);
    };

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
    };
  },

  template: /* html */`
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <WeatherList :cards="cards" />
    </div>
  `,
});

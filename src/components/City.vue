<template>
  <div class="city">
    <div class="main_info">
      <div class="city_name">{{ weather_data.name }}</div>
      <div class="main">{{ weather_data.weather[0].main }}</div>
      <div class="temp">
        {{
          typeof weather_data.main.temp == "number"
            ? Math.round(weather_data.main.temp)
            : weather_data.main.temp
        }}
        {{ config.unit[config.unit_type].temp }}
      </div>
      <div class="feels_like">
        feels like
        {{
          typeof weather_data.main.feels_like == "number"
            ? Math.round(weather_data.main.feels_like)
            : weather_data.main.feels_like
        }}
        {{ config.unit[config.unit_type].temp }}
      </div>
    </div>
    <div class="other_info">
      <div class="wind item">
        <div class="item_name">wind</div>
        <div>{{ weather_data.wind.speed }} {{ config.unit[config.unit_type].wind }}</div>
      </div>
      <div class="pressure item">
        <div class="item_name">pressure</div>
        <div>
          {{ weather_data.main.pressure }} {{ config.unit[config.unit_type].pressure }}
        </div>
      </div>
      <div class="humidity item">
        <div class="item_name">humidity</div>
        <div>
          {{ weather_data.main.humidity }} {{ config.unit[config.unit_type].humidity }}
        </div>
      </div>
      <div class="visibility item">
        <div class="item_name">visibility</div>
        <div>
          {{ weather_data.visibility }} {{ config.unit[config.unit_type].visibility }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'City',
  props: {
    city_id: String,
    props_config: Object
  },
  watch: {
    props_config: function (newConfig) {
      this.config = newConfig
    }
  },
  data () {
    return {
      config: Object,
      weather_data: Object,
      interval: Number,
      latlon: {
        lat: Number,
        lon: Number
      },
      uri: String
    }
  },
  created () {
    this.config = {
      update: { interval: 1000 * 3600 },
      unit_type: 'none',
      unit: {
        none: {
          temp: '',
          wind: '',
          pressure: '',
          humidity: '',
          visibility: ''
        }
      }
    }
    this.weather_data = {
      main: {
        feels_like: '--',
        humidity: '--',
        pressure: '--',
        temp: '--'
      },
      name: 'Current City',
      visibility: '--',
      weather: [{ main: '--' }],
      wind: {
        speed: '--'
      }
    }
    this.uri = '/London.json'
    this.get_data()
    // if (this.city_id === 'Current City') {
    //   this.location()
    // } else {
    //   this.uri = `https://${this.config.sources.url}?q=${this.city_id}&units=${this.unit_type}&appid=${this.config.sources.api_key}`
    //   this.get_data()
    // }

    this.update_interval = setInterval(
      () => {
        this.get_data()
      },
      this.config.update.interval < 5000 ? 5000 : this.config.update.interval
    )
  },
  destroyed () {
    clearInterval(this.update_interval)
  },
  methods: {
    location () {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latlon.lat = position.coords.latitude
        this.latlon.lon = position.coords.longitude
        this.uri = `https://${this.config.sources.url}?lat=${this.latlon.lat}&lon=${this.latlon.lon}&units=${this.unit_type}&appid=${this.config.sources.api_key}`
        this.get_data()
      })
    },
    get_data () {
      axios
        .get(this.uri)
        .then((response) => {
          this.weather_data = response.data
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}
</script>

<style lang="scss"  scoped>
$font-color: rgb(58, 77, 80);
$background-color: rgba(79, 110, 110, 0.5);
$padding-all: 10px;
$bold-text: bold;

.city {
  width: 220px;
  height: 250px;
  color: $font-color;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  justify-items: center;
  background-color: $background-color;
  padding: $padding-all;
}
.city_name {
  font-size: 20px;
  width: 155px;
  font-weight: $bold-text;
  overflow: hidden;
}
.temp {
  font-size: 18px;
  font-weight: $bold-text;
}
.feels_like {
  font-size: 15px;
}
.main_info {
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 0;
  text-align: center;
}

.other_info {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  font-size: 15px;
}

.item {
  width: 100px;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  text-align: center;
}

.item_name {
  font-weight: $bold-text;
}
</style>

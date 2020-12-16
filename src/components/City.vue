<template>
  <div class="city">
    <div class="main_info">
      <div class="city_name">{{weather_data.name}}</div>
      <div class="main">{{ weather_data.weather[0].main }}</div>
      <div class="temp">{{ typeof(weather_data.main.temp) == 'number' ? Math.round(weather_data.main.temp) : weather_data.main.temp }} {{ unit_data[unit_type].temp }}</div>
      <div class="feels_like">
        feels like {{ typeof(weather_data.main.feels_like) == 'number' ? Math.round(weather_data.main.feels_like) : weather_data.main.feels_like }} {{ unit_data[unit_type].temp }}
      </div>
    </div>
    <div class="other_info">
      <div class="wind item">
        <div class="item_name">wind</div>
        <div>{{ weather_data.wind.speed }} {{ unit_data[unit_type].wind }}</div>
      </div>
      <div class="pressure item">
        <div class="item_name">pressure</div>
        <div>{{ weather_data.main.pressure }} {{ unit_data[unit_type].pressure }}</div>
      </div>
      <div class="humidity item">
        <div class="item_name">humidity</div>
        <div>{{  weather_data.main.humidity }} {{ unit_data[unit_type].humidity }}</div>
      </div>
      <div class="visibility item">
        <div class="item_name">visibility</div>
        <div>{{ weather_data.visibility }} {{ unit_data[unit_type].visibility }}</div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
const config = require('../config.json')

export default {
  name: 'City',
  props: {
    city_id: String
  },
  data () {
    return {
      config: Object,
      weather_data: Object,
      unit_data: Object,
      update_interval: Object,
      interval: Number,
      unit_type: String,
      latlon: {
        lat: Number,
        lon: Number
      },
      uri: String

    }
  },
  created () {
    this.config = config
    this.interval = config.update.interval
    this.unit_data = config.unit
    this.unit_type = config.unit_type

    this.weather_data = {}
    this.weather_data.main = {}
    this.weather_data.main.feels_like = '--'
    this.weather_data.main.humidity = '--'
    this.weather_data.main.pressure = '--'
    this.weather_data.main.temp = '--'
    this.weather_data.name = 'Current City'
    this.weather_data.visibility = '--'
    this.weather_data.weather = [{ main: '--' }]
    this.weather_data.wind = {}
    this.weather_data.wind.speed = '--'

    if (this.city_id === 'Current City') {
      this.location()
    } else {
      this.uri = `https://${this.config.sources.url}?q=${this.city_id}&units=${this.unit_type}&appid=${this.config.sources.api_key}`
      this.get_data()
    }

    this.update_interval = setInterval(() => { this.get_data() }, this.interval < 5000 ? 5000 : this.interval)
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
$border-color: rgba(58, 77, 80, 0.5);
$background-color: rgba(79, 110, 110, 0.5);
$border-radius: 10px;
$border-size: 1px;
$padding-all: 10px;
$bold-text: bold;

.city {
  width: 202px;
  height: 250px;
  color: $font-color;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  justify-items: center;
  background-color:$background-color;
  border: $border-size solid $border-color;
  border-radius: $border-radius;
  padding: $padding-all;
}
.city_name {
  font-size: 20px;
  width: 150px;
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

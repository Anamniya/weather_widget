<template>
  <div id="weather">
    <div class="set" @click="settingsToggle"><span>&#9881;</span></div>
    <div class="cities">
      <div v-for="(city, i) of city_list" :key="city + i">
        <City :city_id="city" :props_config="config"/>
      </div>
    </div>
    <Setting
      :hidden_active="setting"
      :available_cities="available_cities"
      @settingsToggle="settingsToggle"
      @selected_city="selected_city"
    />
  </div>
</template>

<script>
import City from './components/City.vue'
import Setting from './components/Setting.vue'

import axios from 'axios'

export default {
  name: 'Weather',
  components: {
    City,
    Setting
  },
  created () {
    this.getConfig()
    this.selected_city()
  },
  data () {
    return {
      setting: false,
      city_list: [],
      config: {},
      available_cities: []
    }
  },
  methods: {
    settingsToggle () {
      this.setting = !this.setting
    },
    selected_city () {
      const selectedCity = localStorage.getItem('selected_city')
      this.city_list = selectedCity ? selectedCity.split(',') : ['Current City']
      localStorage.setItem('selected_city', this.city_list)
    },
    getConfig () {
      axios
        .get('/config.json')
        .then((response) => {
          this.config = response.data
          this.available_cities = this.config.city_list
          // this.available_cities = response.data.city_list
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}
</script>

<style lang="scss">
$font-color-dark: rgb(58, 77, 80);
$font-color-light: rgb(218, 218, 218);
$font-family: Avenir, Helvetica, Arial, sans-serif;
$border-radius: 10px;
$border-color-dark: rgb(58, 77, 80);
$border-size: 1px;
$background-color: rgba(79, 110, 110, 0.1);

#weather {
  font-family: $font-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $font-color-dark;
  margin: 50px;
  width: 242px;
  height: 543px;
  // height: 272px;
  box-sizing: border-box;
  border: $border-size solid $border-color-dark;
  border-radius: $border-radius;
  display: grid;
  overflow: auto;
  background-color: $background-color;
}

.cities > div{
  border-bottom: $border-size solid $border-color-dark;
}

.cities :last-child{
  border-bottom: 0px;
}

.set {
  position: absolute;
  margin-left: 210px;
  font-size: 30px;
  cursor: pointer;
}

.hidden {
  display: none;
}
</style>

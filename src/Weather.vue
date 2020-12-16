<template>
  <div id="weather">
    <div class="set" @click="settingsToggle"><span>&#9881;</span></div>
    <div v-for="(city, i) of city_list" :key="city + i">
      <City :city_id="city"/>
    </div>
    <Setting
      :hidden_active="setting"
      @settingsToggle="settingsToggle"
      @selected_city="selected_city"
    />
  </div>
</template>

<script>
import City from './components/City.vue'
import Setting from './components/Setting.vue'

export default {
  name: 'Weather',
  components: {
    City,
    Setting
  },
  created () {
    this.selected_city()
  },
  data () {
    return {
      setting: false,
      city_list: []
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
    }
  }
}
</script>

<style lang="scss">
$font-color-dark: rgb(58, 77, 80);
$font-color-light: rgb(218, 218, 218);
$font-family: Avenir, Helvetica, Arial, sans-serif;
$border-radius: 10px;
$background-color: rgb(79, 110, 110);

#weather {
  font-family: $font-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $font-color-dark;
  margin: 50px;
  width: 224px;
  height: 563px;
  box-sizing: border-box;
  border-radius: $border-radius;
  display: grid;
  grid-gap: 10px;
  overflow: auto;
}

.set {
  position: absolute;
  margin-left: 192px;
  font-size: 30px;
  cursor: pointer;
}

.hidden {
  display: none;
}
</style>

<template>
  <div class="wrapper" :class="{ hidden: !hidden_active }">
    <div class="setting">
      <div class="close" @click="settingsToggle" :class="{ nonactive: !selected_city.length }">Done</div>
      <div class="header">Selected city:</div>
      <div class="input">
        <input
          class="select_city"
          placeholder="start typing"
          list="city_list"
          v-model="city"
          @keypress.enter="select"
        />
        <datalist id="city_list">
          <option
            :value="city"
            v-for="(city, i) of city_list"
            :key="city + i"
          ></option>
        </datalist>
        <div class="btn" @click="select">Add</div>
      </div>

      <div class="city_list">
        <draggable
          v-model="selected_city"
          group="cities"
          @start="drag = true"
          @end="drag = false"
        >
          <div class="city" v-for="(city, i) of selected_city" :key="city + i">
            <div class="burger">&#8801;</div>
            <div class="city_name">{{ city }}</div>
            <div class="trash" @click="remove(i)">&#128465;</div>
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>

import draggable from 'vuedraggable'
const config = require('../config.json')

export default {
  name: 'Setting',
  components: {
    draggable
  },
  props: {
    hidden_active: Boolean
  },
  data () {
    return {
      selected_city: [],
      city: '',
      city_list: [],
      nonactive: Boolean
    }
  },
  created () {
    this.city_list = config.city_list
    const selectedCity = localStorage.getItem('selected_city')
    this.selected_city = selectedCity ? selectedCity.split(',') : []
  },
  methods: {
    select () {
      if (
        this.city !== '' &&
        !this.selected_city.includes(this.city) &&
        this.city_list.includes(this.city)
      ) {
        this.selected_city.push(this.city)
      }
      this.city = ''
    },
    settingsToggle () {
      if (!this.selected_city.length) { this.selected_city = ['Current City'] }
      localStorage.setItem('selected_city', this.selected_city)
      this.$emit('settingsToggle')
      this.$emit('selected_city')
    },
    remove (i) {
      this.selected_city.splice(i, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
$wrapper-background-color: rgba(79, 110, 110, 0.5);
$main-background-color: rgba(79, 110, 110, 1);
$font-color: rgb(218, 218, 218);
$border-color-dark: rgba(58, 77, 80, 0.5);
$border-color-light: rgb(218, 218, 218);
$border-radius-main: 10px;
$border-radius-item: 5px;
$border-size: 1px;
$padding-all: 10px;
$bold-text: bold;

.wrapper {
  position: absolute;
  background-color: $wrapper-background-color;
  width: 222px;
  height: 557px;
  border: $border-size solid $border-color-dark;
  border-radius: $border-radius-main;
}

.setting {
  width: 200px;
  height: 250px;
  background-color: $main-background-color;
  color: $font-color;
  border: $border-size solid $border-color-dark;
  border-radius: $border-radius-main;
  overflow: auto;
  padding: $padding-all;
}

.close {
  text-align: end;
  width: 190px;
  height: 20px;
  cursor: pointer;
  font-weight: $bold-text;
}

.header {
  height: 20px;
  margin: 5px;
  font-size: 18px;
}

.input {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 5px;
  justify-items: center;
}
.wigetes {
  padding: $padding-all;
}

.header {
  font-weight: $bold-text;
  text-align: center;
}

.select_city {
  width: 135px;
  height: 20px;
  border-radius: $border-radius-item;
  resize: none;
}

.btn {
  width: 40px;
  height: 23px;
  border-radius: $border-radius-item;
  text-align: center;
  border: $border-size solid $border-color-light;
  background-color: rgba(68, 93, 93, 1);
}

.city_list {
  margin-top: 10px;
  width: 200px;
}

.city {
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
  align-items: center;
  cursor: pointer;
  border: $border-size solid $border-color-light;
  background-color: rgba(68, 93, 93, 1);
  border-radius: 5px;
  box-sizing: border-box;
  padding: 0 5px 0 5px;
  margin: 5px;
}

.city_name{
overflow: hidden;
}

.trash {
  text-align: right;
}
</style>

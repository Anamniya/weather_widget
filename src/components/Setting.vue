<template>
  <div class="setting" :class="{ hidden: !hidden_active }">
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
</template>

<script>

import draggable from 'vuedraggable'

export default {
  name: 'Setting',
  components: {
    draggable
  },
  props: {
    hidden_active: Boolean,
    available_cities: Array
  },
  watch: {
    available_cities: function (newValue) {
      // console.log('watch.available_cities', newValue, this.available_cities)
      this.city_list = newValue
    }
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
    const selectedCity = localStorage.getItem('selected_city')
    this.selected_city = selectedCity ? selectedCity.split(',') : []
    this.$emit('selected_city')
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
$background-color:  rgba(79, 110, 110, 1);
$background-gradient:linear-gradient(180deg,
   rgba(79, 110, 110, 1) 0%,
   rgba(103, 131, 131, 1) 35%,
   rgba(132, 161, 161, 1) 100%);
$font-color: rgb(218, 218, 218);
$border-color-light: rgb(218, 218, 218);
$border-radius-main: 10px;
$border-radius-item: 5px;
$border-size: 1px;
$padding-all: 10px;
$bold-text: bold;

.setting {
  position: absolute;
  background-color: $background-color;
  background: $background-gradient;
  width: 222px;
  height: 523px;
  // height: 252px;
  margin: -1px 0px 0px -1px;
  border-radius: $border-radius-main;
  padding: $padding-all;
  color: $font-color;
  overflow: auto;
}

.close {
  text-align: end;
  width: 215px;
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
  width: 150px;
  height: 20px;
  border-radius: $border-radius-item;
  resize: none;
}

.btn {
  width: 40px;
  height: 23px;
  margin-left: 5px;
  border-radius: $border-radius-item;
  text-align: center;
  border: $border-size solid $border-color-light;
  background-color: rgba(68, 93, 93, 1);
}

.city_list {
  margin-top: 10px;
  width: 218px;
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

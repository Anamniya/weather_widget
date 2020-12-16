import Vue from 'vue'
import Weather from './Weather.vue'

Vue.config.productionTip = true

new Vue({
  render: h => h(Weather)
}).$mount('#weather')

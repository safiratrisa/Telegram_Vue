import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueGeolocation from 'vue-browser-geolocation'
import Notifications from 'vue-notification'
import Vuelidate from 'vuelidate'
Vue.use(Notifications)

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCl_7EGhLgvjy-cBBVO653wXncUG5bbzd8',
    libraries: 'places'
  }
})
Vue.use(VueGeolocation)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

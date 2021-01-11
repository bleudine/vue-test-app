import Vue from 'vue'
import VScrollLock from 'v-scroll-lock'
import vuetify from '@/plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(VScrollLock)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

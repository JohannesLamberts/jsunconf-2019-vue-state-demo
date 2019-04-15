import Vue from 'vue'
import VuetifyPlugin from '@/plugins/vuetify'
import StatePlugin from '@/plugins/state'
import App from './App'
import router from './router'

[StatePlugin, VuetifyPlugin].forEach(plugin => Vue.use(plugin))

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

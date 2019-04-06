import Vue from 'vue'
import VueHistory from '@sum.cumo/vue-history'
import VueModels from '@sum.cumo/vue-models'
import './plugins/vuetify'
import App from './App'
import router from './router'

Vue.use(VueModels, {
  mixins: [{ history: true }],
  restoreOnReplace: true,
})

Vue.use(VueHistory, {
  feed: { asyncStart: false },
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

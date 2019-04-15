import VueHistory from '@sum.cumo/vue-history'
import VueStates from '@sum.cumo/vue-states'

export default (vue) => {
  vue.use(VueStates, {
    mixins: [{ history: true }],
    restoreOnReplace: true,
  })

  vue.use(VueHistory, {
    feed: process.env === 'development' ? { asyncStart: false } : false,
  })
}

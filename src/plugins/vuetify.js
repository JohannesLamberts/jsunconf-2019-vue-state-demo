import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

export default (vue) => {
  vue.use(Vuetify, {
    iconfont: 'md',
  })
}

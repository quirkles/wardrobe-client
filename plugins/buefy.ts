import Vue from 'vue'
import Buefy from 'buefy'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPlus, faExclamationCircle)
Vue.component('vue-fontawesome', FontAwesomeIcon)
Vue.use(Buefy, {
  defaultIconComponent: 'vue-fontawesome',
  defaultIconPack: 'fas',
})

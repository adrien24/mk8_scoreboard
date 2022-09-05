import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'


import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faUserPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
library.add(faUserPlus, faXmark)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

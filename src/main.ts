import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { Popover, Directive } from '@/components/Popover'

Vue.config.productionTip = false
Vue.directive('popover', Directive);
Vue.component('Popover', Popover);
new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

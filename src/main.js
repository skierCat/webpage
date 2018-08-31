// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import 'vue-easytable/libs/themes-base/index.css'
import {VTable,VPagination} from 'vue-easytable'
import XLSX from 'xlsx';
import VueParticles from 'vue-particles'
import config from './config/config.js'




Vue.config.productionTip = false
Vue.use(iView)
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)
Vue.use(VueParticles) 
Vue.use(config)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

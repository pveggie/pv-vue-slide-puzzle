// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Siema from 'vue2-siema';

import './assets/styles/_variables.scss';

import App from './App';

Vue.config.productionTip = false;
Vue.use(Siema);

/* eslint-disable no-new */

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
});

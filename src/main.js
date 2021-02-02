import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap';

import axios from 'axios';//主要的Ajax套件
import VueAxios from 'vue-axios'; //將它轉為vue的套件
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { ValidationObserver, ValidationProvider, extend, localize, configure } from 'vee-validate';
import TW from 'vee-validate/dist/locale/zh_TW.json'
import * as rules from 'vee-validate/dist/rules';
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

localize('zh_TW', TW);

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
});


import './bus';
import dateFilter from './filters/date';
import roundedFilter from './filters/rounded';


Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.component('loading', Loading)
Vue.filter('date', dateFilter);
Vue.filter('rounded', roundedFilter);


axios.defaults.withCredentials = true;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')



router.beforeEach((to, from, next) => {
  console.log('to', to, 'from', from, 'next', next)
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
    const vm = this;
    axios.post(api)
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          next()
        } else {
          next({
            path: "/login"
          })
        }
      });
  } else {
    next()
  }

})
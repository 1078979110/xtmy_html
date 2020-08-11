// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import top from '@/components/top.vue';
import bottom from '@/components/bottom.vue';
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
Vue.use(VueAxios,axios)
Vue.prototype.$axios= axios
Vue.prototype.userinfo = [];
Vue.prototype.type = 1;
Vue.prototype._token = '',
Vue.prototype.hid = 0;
Vue.config.productionTip = false
Vue.$cookies.config();
Vue.use(ElementUI);
Vue.use(top)
Vue.use(bottom)
Vue.component('top',top)
Vue.component('bottom',bottom)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

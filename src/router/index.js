import Vue from 'vue'
import Router from 'vue-router'
import home from '@/src/views/home.vue'
import classify from '@/src/views/classify.vue'
import search from '@/src/views/search.vue'
import shopCart from '@/src/views/shopCart.vue'
import placeOrder from '@/src/views/placeOrder.vue'
import order from '@/src/views/order.vue'
import login from '@/src/views/login.vue'
import password from '@/src/views/password.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/classify',
      name: 'classify',
      component: classify
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/shopCart',
      name: 'shopCart',
      component: shopCart
    },
    {
      path: '/placeOrder',
      name: 'placeOrder',
      component: placeOrder
    },
    {
      path: '/order',
      name: 'order',
      component: order
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/password',
      name: 'password',
      component: password
    }
  ]
})

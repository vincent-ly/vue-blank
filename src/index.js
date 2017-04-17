import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './components/app/app.vue'
import Home from './components/home'
import './assets/css/styles.scss'

Vue.use(VueRouter)

const routes = [
  Home
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default new Vue({
  el: '#main',
  router,
  render: (h) => h(App)
})


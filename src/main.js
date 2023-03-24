import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'vue-router'
import './assets/icons/svg/index'
import editorHtml from '@/components/editor/editorHtml'
import global from "./global.vue";

import '@/assets/css/iconfont.css';

Vue.prototype.global = global;
Vue.use(global);
Vue.use(ElementUI);
Vue.component("editorHtml", editorHtml)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

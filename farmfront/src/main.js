import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import VueOnsen from 'vue-onsenui';
import VueSimpleAlert from "vue-simple-alert";

Vue.config.productionTip = false
Vue.use(VueOnsen);
Vue.use(VueSimpleAlert);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

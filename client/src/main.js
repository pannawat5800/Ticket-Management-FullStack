import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import axios from 'axios';
import VueAxios from 'vue-axios';

import store from './store/index.store';

import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import router from './router'

Vue.config.productionTip = false
Vue.use(VueAxios, axios);
Vue.use(require('vue-moment'));
// Vue.use(Vuex);

new Vue({
    vuetify,
    store,
    router,
    render: h => h(App)
}).$mount('#app')
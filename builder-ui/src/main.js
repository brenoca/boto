import Vue from 'vue';
import FlowyPlugin from '@/index.js';
import Block from '@/components/Block.vue';
import Node from '@/components/Node.vue';
import VModal from 'vue-js-modal';
import App from './App.vue';

Vue.use(FlowyPlugin);
Vue.use(VModal);
Vue.component('Block', Block);
Vue.component('Node', Node);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

import Vue from 'vue'
import App from './App.vue'
import store from './store'
import 'bootstrap-scss';
import productJson from "./assets/data.json";
import configJson from "./assets/config.json";

Vue.config.productionTip = false

const productData = productJson;

new Vue({
  store,
  render: h => h(App),
  created() {
    this.$store.commit("productData", productData.products);
    this.$store.commit("config", configJson);
  }
}).$mount('#app')

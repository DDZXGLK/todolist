import Vue from 'vue'
import App from './App.vue'

// 关闭生产提示
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this //注册全局事件总线
  }
}).$mount('#app')
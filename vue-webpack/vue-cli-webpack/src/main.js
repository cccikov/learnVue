// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: x => x(App)
        // render: (x) => x(App)
        // render: (x) => {return x(App)}
        /* render:function(createElement){
          return createElement(App);
        } */

    // vue1.0写法
    // components: { App },// 相当于 {"App":App}
    // template: '<App/>'
})
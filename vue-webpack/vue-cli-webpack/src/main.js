// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "./css/reset.less";
// import "./mock" // mock

import initPlugin from "./common/initPlugin"

// 全局暴露，未必需要;
window.$ = $;

Vue.use(initPlugin);

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
});

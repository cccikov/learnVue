// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import commonMethod from "./common/commonMethods"
import ajaxMethods from "./common/ajaxMethods"

import "./mock" // mock

// 全局暴露，未必需要;
window.$ = $;

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
});

Vue.mixin({
    data() {
        return {
            global: "全局信息",
        }
    },
    methods: Object.assign({
            log(str) {
                console.log("%c" + str, "font-size:20px;color:red")
            }
        },
        commonMethod,
        ajaxMethods
    ),
    created() {
        window.__vm__ = this;
    },
});


Vue.prototype.$axios = axios;

// 发布，订阅模式
Vue.prototype.bus = new Vue(); // 发布-订阅总线 EventBus
// this.bus.$emit("change",data); // 发布
// this.bus.$on("change",fn)


/**
 * vue 实现全局数据传输，共用的方式
 * 1. vuex 一般只是存储状态用，就是全局变量，改变全局变量的方法，一般全局功能性的方法不卸载这里
 * 2. Vue.mixin 全局混合，适合全局方法，全局变量
 * 3. vue.prototype.xx 注意xx不是响应式数据，所以最好存储的是常量
 * 4. vue.prototype.bus 发布-订阅总线 EventBus，一般是事件之间的触发
 */

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

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
    created() {
        window.__vm__ = this;
    },
    mounted() {
        let ua = navigator.userAgent.toLowerCase();
        if ((/ucbrowser/).test(ua)) {
            this.$nextTick(() => {
                setTimeout(() => {
                    window.scrollTo(0, 0);
                    Object.assign(document.body.style, {
                        height: "auto",
                        overflow: "visible"
                    });
                }, 1000 / 30);
            });
        } else if ((/mqqbrowser/).test(ua)) {
            this.$nextTick(() => {
                setTimeout(() => {
                    window.scrollTo(0, 0);
                    Object.assign(document.body.style, {
                        height: "auto",
                        overflow: "visible"
                    });
                }, 1000 / 30);
            });
        } else if ((/iPhone|iPad|iPod|iOS/i).test(ua)) {
            this.$nextTick(() => {
                setTimeout(() => {
                    window.scrollTo(0, 0);
                    Object.assign(document.body.style, {
                        height: "auto",
                        overflow: "visible"
                    });
                }, 1000 / 30);
            });
        }

    },
});

// 发布，订阅模式
Vue.prototype.bus = new Vue();
// this.bus.$emit("change",data); // 发布
// this.bus.$on("change",fn)

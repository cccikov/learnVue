/**
 * Vue 插件
 *
 * 插件通常用来为 Vue 添加全局功能。插件的功能范围没有严格的限制——一般有下面几种：
 *
 * 1. 添加全局方法或者属性。如: vue-custom-element
 *
 * 2. 添加全局资源：指令/过滤器/过渡等。如 vue-touch
 *
 * 3. 通过全局混入来添加一些组件选项。如 vue-router
 *
 * 4. 添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现。
 *
 * 5. 一个库，提供自己的 API，同时提供上面提到的一个或多个功能。如 vue-router
 */



// MyPlugin.install = function (Vue, options) {
//     // 1. 添加全局方法或属性
//     Vue.myGlobalMethod = function () {
//         // 逻辑...
//     }

//     // 2. 添加全局资源
//     Vue.directive('my-directive', {
//         bind(el, binding, vnode, oldVnode) {
//             // 逻辑...
//         }
//         ...
//     })

//     // 3. 注入组件选项
//     Vue.mixin({
//         created: function () {
//                 // 逻辑...
//             }
//             ...
//     })

//     // 4. 添加实例方法
//     Vue.prototype.$myMethod = function (methodOptions) {
//         // 逻辑...
//     }
// }


import axios from 'axios'
import commonMethod from "./commonMethods"
import ajaxMethods from "./ajaxMethods"
import gloCom from "../components/31.global-components/gloCom.vue";


/**
 *  ../../build/webpack.dev.conf 里的 webpack.ProvidePlugin
 */
console.log(globalPlugin);
console.log(globalPlugin_default);
// console.log(globalPlugin_relative); // 一用就报错，因为模块providePlugin.js 相对于当前模块的路径是 ./providePlugin.js，而不是 webpack.ProvidePlugin 那里定义 ../src/common/providePlugin.js

/* 对 Vue 构造函数的任何操作都可以写在里面 */
const initPlugin = {}
initPlugin.install = function (Vue, option) {

    /**
     * 添加全局方法或属性(静态属性)
     */
    Vue.config.productionTip = false;


    /**
     * 全局混合
     */
    Vue.mixin({
        data() {
            return {
                global: "全局信息",
                mixin_timer: null,
            }
        },
        methods: Object.assign({
                log(str) {
                    console.log("%c" + str, "font-size:20px;color:red")
                },
                /**
                 * 关闭全局定时器
                 */
                mixin_clearTimer() {
                    clearTimeout(this.mixin_timer);
                },
                /**
                 * 全局定时器
                 * @param {Function} per 每次执行的函数
                 * @param {Function} end 停止执行的函数
                 */
                mixin_setTimer(per, end) {
                    let _this = this;
                    _this.mixin_clearTimer();

                    function sco() {
                        let n = 0;
                        let arr = [300, 300, 600, 1000, 2000, 5000, 5000];

                        function run() {
                            _this.mixin_timer = setTimeout(() => {
                                console.log(n);
                                per && per();
                                n++
                                if (n < arr.length) {
                                    run();
                                } else {
                                    console.log("---自动关闭---");
                                    _this.mixin_clearTimer();
                                    end && end()
                                }
                            }, arr[n]);
                        }
                        return run
                    }
                    let timeout = sco();
                    timeout();
                }
            },
            commonMethod,
            ajaxMethods
        ),
        created() {
            window.__vm__ = this;
        },
        destroyed() {
            this.mixin_clearTimer();
        },
    });


    /**
     * 注册全局组件
     */
    Vue.component('gloCom', Vue.extend(gloCom))


    /**
     * axios 请求（实例属性）
     */
    Vue.prototype.$axios = axios;



    /**
     * 发布-订阅总线（实例属性）
     */
    // 发布，订阅模式
    Vue.prototype.bus = new Vue(); // 发布-订阅总线 EventBus
    // this.bus.$emit("change",data); // 发布
    // this.bus.$on("change",fn)


    /**
     * vue 实现全局数据传输，共用的方式
     * 1. vuex 一般只是存储状态用，就是全局变量，改变全局变量的方法，一般全局功能性的方法不卸载这里。推荐全局变量
     * 2. Vue.mixin 全局混合，适合全局方法；如果是变量的话，其实只是每个组件都有同个名字的变量，但不是同一个变量，所以基本就是只读变量。
     * 3. vue.prototype.xx 注意xx不是响应式数据，所以最好存储的是常量或者方法，但是方法的this不是指向组件实例
     * 4. vue.prototype.bus 发布-订阅总线 EventBus，一般是事件之间的触发
     */
}

export default initPlugin

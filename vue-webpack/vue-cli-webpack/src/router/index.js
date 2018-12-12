import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld.vue' // @代表 /src路径
// import HelloWorld from '../components/HelloWorld.vue'

Vue.use(Router)

export default new Router({
    routes: [{
            path: "/",
            name: "index",
            component: resolve => require(['@/components/index.vue'], resolve)
        }, {
            path: "/index",
            name: "index",
            component: resolve => require(['@/components/index.vue'], resolve)
        }, {
            path: "/test",
            name: "test",
            component: resolve => require(['@/components/test.vue'], resolve)
        }, {
            path: '/HelloWorld',
            name: 'HelloWorld',

            // component: HelloWorld,

            // component: () => import ('@/components/HelloWorld.vue') // 官方懒加载写法

            // components: {
            //     default: () =>
            //         import ('@/components/HelloWorld.vue')
            // }

            component: resolve => require(['@/components/HelloWorld.vue'], resolve) // 懒加载 应该是和webpack require.ensure()有关
        },

        {
            path: "/publish",
            name: "publish",
            component: resolve => require(['@/components/observer/publish.vue'], resolve)
        }, {
            path: "/subscribe",
            name: "subscribe",
            component: resolve => require(['@/components/observer/subscribe.vue'], resolve)
        }, {
            path: "/lifecycle",
            name: "lifecycle",
            component: resolve => require(['@/components/lifecycle.vue'], resolve)
        }, {
            path: "/vue-loader",
            name: "vue-loader",
            component: resolve => require(['@/components/vue-loader/parent.vue'], resolve)
        },{

            path: "/componentInit",
            name: "componentInit",
            component: resolve => require(['@/components/componentInit/componentInit.vue'], resolve)
        }
    ]
})

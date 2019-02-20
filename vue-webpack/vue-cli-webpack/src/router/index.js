import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld.vue' // @代表 /src路径
// import HelloWorld from '../components/HelloWorld.vue'

Vue.use(Router); // vue 安装 vue-router


const router = new Router({
    routes: [{
            path: "/",
            name: "home",
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
        }, {
            path: "/componentInit",
            name: "componentInit",
            component: resolve => require(['@/components/componentInit/componentInit.vue'], resolve)
        }, {
            path: "/nextTick",
            name: "nextTick",
            component: resolve => require(['@/components/nextTick.vue'], resolve)
        },
        {
            path: "/page1",
            name: "page1",
            component: resolve => require(['@/components/page1.vue'], resolve)
        },
        {
            path: "/page2",
            name: "page2",
            component: resolve => require(['@/components/page2.vue'], resolve)
        },
        {
            path: "/page3",
            name: "page3",
            component: resolve => require(['@/components/page3.vue'], resolve)
        },
    ]
});


router.afterEach(() => {
    window.scrollTo(0, 0);
    let ua = navigator.userAgent.toLowerCase();
    if((/ucbrowser/).test(ua)){
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 200);
    }else if((/mqqbrowser/).test(ua)){
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);
    }else if((/iPhone|iPad|iPod|iOS/i).test(ua)){
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);
    }
});


export default router;

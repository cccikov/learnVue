import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld.vue' // @代表 /src路径
// import HelloWorld from '../components/HelloWorld.vue'

Vue.use(Router); // vue 安装 vue-router

let checkbox = [{
        path: "/render-checkbox",
        name: "render-checkbox",
        component: resolve => require(['@/components/render-checkbox.vue'], resolve)
    },
    {
        path: "/render-checkbox2",
        name: "render-checkbox2",
        component: resolve => require(['@/components/render-checkbox2.vue'], resolve)
    }
]

const router = new Router({
    routes: [{
            path: "/",
            redirect: {
                name: "index"
            }
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
        ...checkbox
    ]
});

let body = document.body;
let ua = navigator.userAgent.toLowerCase();

router.beforeEach((from, to, next) => {
    if ((/ucbrowser/).test(ua)) {
        Object.assign(body.style, {
            height: 0,
            overflow: "hidden"
        })
    } else if ((/mqqbrowser/).test(ua)) {
        Object.assign(body.style, {
            height: 0,
            overflow: "hidden"
        })
    } else if ((/iPhone|iPad|iPod|iOS/i).test(ua)) {
        Object.assign(body.style, {
            height: 0,
            overflow: "hidden"
        })
    }
    next();
});


router.afterEach(() => {
    window.scrollTo(0, 0);
});


export default router;

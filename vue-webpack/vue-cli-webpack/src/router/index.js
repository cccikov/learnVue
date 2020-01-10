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
];

let vModel = [{
        path: "/v-model",
        name: "v-model",
        component: resolve => require(['@/components/v-model.vue'], resolve)
    },
    {
        path: "/sync",
        name: "sync",
        component: resolve => require(['@/components/.sync.vue'], resolve)
    },
    {
        path: "/sync&v-model",
        name: "sync&v-model",
        component: resolve => require(['@/components/sync&v-model.vue'], resolve)
    },
];

const mixin = [{
    path: "/mixin_demo1",
    name: "mixin_demo1",
    component: resolve => require(['@/components/mixin/mixin_demo1.vue'], resolve)
}, {
    path: "/mixin_demo2",
    name: "mixin_demo2",
    component: resolve => require(['@/components/mixin/mixin_demo2.vue'], resolve)
}]

const compile = [{
    path: "/compile",
    name: "compile",
    component: resolve => require(['@/components/compile/compile.vue'], resolve)
}]

// 日期选择
const datePicker = [{
        path: "/pickerView",
        name: "pickerView",
        component: resolve => require(['@/components/datePicker/view.vue'], resolve)
    }, {
        path: "/datePicker",
        name: "datePicker",
        component: resolve => require(['@/components/datePicker/datePicker.vue'], resolve)
    },
    {
        path: "/weekPicker",
        name: "weekPicker",
        component: resolve => require(['@/components/datePicker/weekPicker.vue'], resolve)
    },
    {
        path: "/weekPickerInput",
        name: "weekPickerInput",
        component: resolve => require(['@/components/datePicker/weekPickerInput.vue'], resolve)
    }
]

// 各种坑
const slot = [{
    path: "/slot",
    name: "slot",
    component: resolve => require(['@/components/slot/slot.vue'], resolve)
}]

// 各种坑
const warning = [{
    path: "/warning",
    name: "warning",
    component: resolve => require(['@/components/warning/warning.vue'], resolve)
}]


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
            path: "/demo",
            name: "demo",
            component: resolve => require(['@/components/demo.vue'], resolve)
        }, {
            path: "/standard",
            name: "standard",
            component: resolve => require(['@/components/standard.vue'], resolve)
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
        {
            path: "/week-period",
            name: "week-period",
            component: resolve => require(['@/components/widget/week-period.vue'], resolve)
        },
        {
            path: "/nesting",
            name: "nesting",
            component: resolve => require(['@/components/nesting/out.vue'], resolve)
        },
        {
            path: "/tableandflex",
            name: "tableandflex",
            component: resolve => require(['@/components/table & flex.vue'], resolve)
        },
        {
            path: "/computedandwatch",
            name: "computedandwatch",
            component: resolve => require(['@/components/computed & watch.vue'], resolve)
        },
        {
            path: "/provide&inject",
            name: "provide&inject",
            component: resolve => require(['@/components/provide&inject/index.vue'], resolve)
        },
        {
            path: "/keyincomponent",
            name: "keyincomponent",
            component: resolve => require(['@/components/key/index.vue'], resolve)
        },
        {
            path: "/render",
            name: "render",
            component: resolve => require(['@/components/render/index.vue'], resolve)
        },
        {
            path: "/render_sfc",
            name: "render_sfc",
            component: resolve => require(['@/components/render/index_sfc.vue'], resolve)
        },
        // 查看render函数的
        {
            path: "/getRender",
            name: "getRender",
            component: resolve => require(['@/components/render/getRender/getRender.vue'], resolve)
        },
        {
            path: "/render-v-if",
            name: "render-v-if",
            component: resolve => require(['@/components/render/render-v-if.vue'], resolve)
        },
        // getData 测试 axios mock
        {
            path: "/axios-get-data",
            name: "axiosGetData",
            component: resolve => require(['@/components/axiosGetData/index.vue'], resolve)
        },
        {
            path: "/mock",
            name: "mock",
            component: resolve => require(['@/components/axiosGetData/mock.vue'], resolve)
        },
        {
            path: "/eightcorner1",
            name: "eightcorner1",
            component: resolve => require(['@/components/eightCorner/demo1/index.vue'], resolve)
        },
        {
            path: "/eightcorner2",
            name: "eightcorner2",
            component: resolve => require(['@/components/eightCorner/demo2/index.vue'], resolve)
        },
        {
            path: "/30/global/methods",
            name: "30-global-methods",
            component: resolve => require(['@/components/30.global-methods/index.vue'], resolve)
        },
        {
            path: "/31/global/components",
            name: "30-global-components",
            component: resolve => require(['@/components/31.global-components/index.vue'], resolve)
        },
        /* demo 30 */
        {
            path: "/eightcorner3",
            name: "eightcorner3",
            component: resolve => require(['@/components/eightCorner/demo3/index.vue'], resolve)
        },
        ...checkbox,
        ...vModel,
        ...mixin,
        ...compile,
        ...datePicker,
        ...slot,
        ...warning,
        {
            path: "/page*",
            name: "page-all",
            component: resolve => require(['@/components/page1.vue'], resolve)
        },
        {
            path: "*",
            name: "404",
            component: resolve => require(['@/components/404.vue'], resolve)
        },
    ]
});

let ua = navigator.userAgent.toLowerCase();

router.beforeEach((to, from, next) => {
    console.log("from", from.fullPath);
    console.log("to", to.fullPath);
    if ((/ucbrowser/).test(ua) || (/mqqbrowser/).test(ua) || (/iPhone|iPad|iPod|iOS/i).test(ua)) {
        /**
         * qq uc
         * ios 的浏览器，跳转时浏览器状态栏会遮住内容
         */
        window.onresize = function () {
            window.scrollTo(0, 0);
            window.onresize = null;
            window.ontouchmove = null
        }
        window.ontouchmove = function () {
            window.onresize = null;
            window.ontouchmove = null
        }
    }

    var stackId = parseInt(Math.random() * 10000000000000000000).toString().slice(0, parseInt(Math.random() * 14 + 1)); // 当前调用桟ID，假装是ID而已
    console.log("%c id:  **" + stackId + "**    进入beforeEach", "color:red;font-size:30px");

    if (to.name === "page1" && !("num" in to.query)) {
        router.push({
            name: "page1",
            query: {
                num: Math.random()
            }
        })
    } else if (to.name === "page2" && !("num" in to.query)) {
        console.log("%c id:  **" + stackId + "**    第1步", "color:red;font-size:30px");
        router.push({
            name: "page2",
            query: {
                num: Date.now()
            }
        });
        console.log("%c id:  **" + stackId + "**    第3步", "color:red;font-size:30px");
        next();
    } else {
        console.log("%c id:  **" + stackId + "**    第2步", "color:red;font-size:30px");
        next();
    }
});


router.afterEach(() => {
    window.scrollTo(0, 0);
});


export default router;















function scrollBehavior(to, from, savedPosition) {
    if (savedPosition && to.meta.keepAlive) {
        window.requestAnimationFrame(() => {
            window.scrollTo(savedPosition.x, savedPosition.y); // chrome 浏览器后退时，滚动位置由chrome控制
        });
    } else {
        window.requestAnimationFrame(() => {
            window.scrollTo(0, 0); // chrome 浏览器后退时，滚动位置由chrome控制
        });
        let ua = navigator.userAgent.toLowerCase();
        /**
         * qq uc
         * ios 的浏览器，跳转时浏览器状态栏会遮住内容
         */
        if ((/(iPhone|iPad|iPod|iOS)/i).test(ua)) {
            resizeToTop()
        } else if ((/mqqbrowser/).test(ua)) {
            resizeToTop(true);
        }
    }
}

function resizeToTop(again) {
    window.onresize = function () {
        window.scrollTo(0, 0);
        if (again) {
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 1000 / 30);
        }
        window.onresize = null;
        window.ontouchmove = null
    }
    window.ontouchmove = function () {
        window.onresize = null;
        window.ontouchmove = null
    }
}

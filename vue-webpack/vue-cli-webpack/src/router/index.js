import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue' // @代表 /src路径
// import HelloWorld from '../components/HelloWorld.vue'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'HelloWorld',

        // component: HelloWorld,

        // component: () => import ('@/components/HelloWorld.vue')

        // components: {
        //     default: () =>
        //         import ('@/components/HelloWorld.vue')
        // }

        component: resolve => require(['@/components/HelloWorld.vue'], resolve) // 懒加载
    }]
})
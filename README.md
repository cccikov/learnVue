# learnVue

### for learning vue

vue-webpack 里面项目是通过 vue-cli2 脚手架 ，参考 https://github.com/vuejs/vue-cli/tree/v2

``` bash
$ vue init <template-name> <project-name>
```

``` bash
$ vue init webpack my-project
```

`webpack` - A full-featured Webpack + vue-loader setup with hot reload, linting, testing & css extraction.

`webpack-simple` - A simple Webpack + vue-loader setup for quick prototyping.

#### 附带

* vue-loader

* vue-router
* vuex
* vuex-persistedstate vux持久化
* vue ssr , Nuxt.js

* VuePress

* keep-alive

[单文件组件规范](https://vue-loader.vuejs.org/zh/spec.html)

* [vue相关组件资源](https://github.com/vuejs/awesome-vue)
* [vue相关组件资源](https://www.awesomes.cn/subject/8311014)

* 框架
    
    - 移动端
        1. 有赞 vant
        2. 饿了么 mint-ui
        3. quasar
        
    - pc（管理）
        1. iview-admin（基于iview-ui ）
            * 官网 https://lison16.github.io/iview-admin-doc/#/
            * github地址 https://github.com/iview/iview-admin
            * demo https://admin.iviewui.com/
        2. element-admin（基于element-ui）
            * 官网 https://panjiachen.github.io/vue-element-admin-site/zh/
            * 官网 https://panjiachen.gitee.io/vue-element-admin-site/zh/
            * github地址 https://github.com/PanJiaChen/vue-element-admin
            * demo https://panjiachen.gitee.io/vue-element-admin/
        3. eladmin (基于 element-ui)
            * 官网 https://el-admin.vip/
            * github前端 https://github.com/elunez/eladmin-web
            * 码云前端 https://gitee.com/elunez/eladmin-web
            * demo https://el-admin.xin/dashboard

    - ps: 
        * element-ui
            - 官网 https://element.eleme.cn/#/
            - github地址 https://github.com/ElemeFE/element
        * iview-ui
            - 官网 https://iviewui.com/
            - github地址 https://github.com/view-design/ViewUI


* 控制台报错：组件报错
```
found in

---> <Home> at src/views/consumer/home/home.vue
       <Layout> at src/views/consumer/home/layout.vue
         <Index> at src/views/consumer/index.vue
           <App> at src/App.vue
             <Root>
```
`<Home>` 组件报错 `src/views/consumer/home/home.vue` 对应的组件文件，像这种大写开头，不是自己定义的组件，一般就是路由组件

* 打包压缩[https://www.jianshu.com/p/957ed8a7ca73]

* 拖拽组件 vue-slicksort
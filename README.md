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
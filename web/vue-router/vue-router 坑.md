# vue-router 坑

1. `NavigationDuplicated: Navigating to current location ("/home") is not allowed`

    `NavigationDuplicated: Navigating to current location ("/home") is not allowed`

    导航重复: 不允许导航到当前位置("/home")

    vue-router @3.1.0 版本开始，不允许导航到当前路径（如果是query不同可以）

    `{name:'home'}` => `{name:'home'}` 报错

    `{name:'home'}` => `{name:'home',query:{name:'123'}}` 不报错，但是不会触发 created（旧版也不会），可以通过watch $route 或者 $route.query; vue-router 2.2 新增一个 `beforeRouteUpdate` 钩子函数

    现在 `this.$router.push()` 返回的是一个 `promise` 对象

    ``` javascript
    this.$router.push({
        name: "home",
        query: {
            name: "123"
        }
    })
    .then(res => { // 跳转成功后，返回 this.$route
        console.log(this.$route)
        console.log(res);
        console.log(this.$route == res)
    })
    .catch(err => { // 跳转失败后报错，返回报错
        console.log(err);
    });
    ```

    解决方式:

    1. 写代码时，注意做好判断，避免相同路径路由跳转（最优）

    2. 在项目引用 vue-router 的地方 ，改 vue-router 的 `push` 方法，使 `catch` 的报错不通过 `console.error()` 打印在控制台中（全局有效）

        ``` javascript
        import VueRouter from "vue-router";

        // 重写路由的push方法
        const routerPush = VueRouter.prototype.push
        VueRouter.prototype.push = function () {
            return origin_push.call(this, ...arguments).catch(err=> err)
        }
        ```
    3. 在 `this.$router.push()` 后面加上一个 `catch`，不让报错

        ``` javascript
        $router.push({name:'home',query:{name:'1234'}}).catch(err=>{})
        ```

    4. 在 `$router.push` 基础上再封装成一个全局函数，跳转统一改用这个函数

        1. 函数里面可以做判断，相同路径不跳转

        2. 只会加上 catch，不让报错

            ``` javascript
            go(route) {
                this.$router.push(route)
                .catch(() => { // 跳转失败后报错
                });
            }
            ```
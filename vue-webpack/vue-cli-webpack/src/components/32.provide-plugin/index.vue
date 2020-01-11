<template>
    <div>
        <p>webpack.ProvidePlugin</p>
        <p>全局模块都引入这里面的模块</p>
        <p>但是不能直接在vue里面通过this去调用，因为不是实例方法</p>

        <p>globalPlugin</p>
        <p>globalPlugin_default</p>
        <p>author</p>
        <p>author_first_name</p>
        <p>author_last_name</p>
        <p>author_year</p>
    </div>
</template>
<script>
    export default {
        beforeCreate() {
            /**
             *  ../../build/webpack.dev.conf 里的 webpack.ProvidePlugin
             */
            console.log(globalPlugin);
            console.log(globalPlugin_default);
            // console.log(globalPlugin_relative); // // 一用就报错，因为模块providePlugin.js 相对于当前模块的路径是 ../../common/providePlugin.js，而不是 webpack.ProvidePlugin 那里定义 ../src/common/providePlugin.js

            // 如果是想全局导入模块里面的某个属性
            console.log(author); // 整个模块
            console.log(author_first_name, author.firstName); // 某个属性
            console.log(author_last_name, author.lastName); // 某个属性
            console.log(author_year, author.year); // 某个属性
        }
    };
</script>
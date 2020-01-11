/**
 * webpack.ProvidePlugin
 *
 * 用于全部模块都会自动加入本模块
 *
 * 但是不是window全局
 */

export default {
    name: "webpack.ProvidePlugin",
    handler(arg) {
        console.log(this.name, ...arg)
    }
}

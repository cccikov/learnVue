<!-- render v-if v-else v-else-if js替代用法 -->
<style lang="less" scoped>
    .demo-section {
        padding: 20px;
        margin: 15px 0;
        box-shadow: 5px 6px 5px rgba(158, 158, 158, 0.37), 0px 0px 12px rgba(0, 0, 0, 0.1);
    }
    hr {
        margin: 100px 0;
    }
</style>
<template>
    <div class="wrap">
        <button @click="refresh">刷新数据</button>
        <empty class="demo-section"></empty>

        <!-- 简单用法 -->
        <h2>简单用法</h2>
        <div class="demo-section">
            <div v-if="num===1">这是数据为1时，显示的内容。Lorem.</div>
            <div v-else-if="num===2">这是数据为2时，显示的内容。Lorem, ipsum.</div>
            <div v-else>这是数据为其他时，显示的内容。Lorem, ipsum dolor.</div>
        </div>
        <simple class="demo-section" :num="num"></simple>
        <simple2 class="demo-section" :num="num"></simple2>
        <simple3 class="demo-section" :num="num"></simple3>

        <!-- 多个if -->
        <h2>多个if</h2>
        <div class="demo-section">
            <div v-if="num>=1">这是数据为1时，显示的内容。Lorem.</div>
            <div v-if="num>=2">这是数据为2时，显示的内容。Lorem, ipsum.</div>
            <div v-if="num>=3">这是数据为3时，显示的内容。Lorem, ipsum dolor.</div>
        </div>
        <multiple class="demo-section" :num="num"></multiple>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                num: parseInt(Math.random() * 3 + 1)
            };
        },
        methods: {
            refresh() {
                this.num = parseInt(Math.random() * 3 + 1);
            }
        },
        components: {
            empty: {
                render: function(h) {
                    console.log(this._e(), h(undefined, "")); // vue 内部空内容 this._e() ， 相当于 h(undefined, "")
                    console.log(JSON.stringify(this._e()) == JSON.stringify(h(undefined, "")));

                    /* 有些时候我们需要通过if判断，有就显示，没有就不显示；没有的时候，可以返回空字符串，null等 */
                    return h("div", ["", "", null, undefined, false, true]);
                }
            },
            simple: {
                render: function(h) {
                    /**
                     * 在执行createElement之前确定好内容
                     */
                    let dom;

                    if (this.num === 1) {
                        dom = h("div", "这是数据为1时，显示的内容。Lorem.");
                    } else if (this.num === 2) {
                        dom = h("div", "这是数据为2时，显示的内容。Lorem, ipsum.");
                    } else {
                        dom = h("div", "这是数据为其他时，显示的内容。Lorem, ipsum dolor.");
                    }

                    return h("div", [dom]);
                },
                props: ["num"]
            },
            simple2: {
                render: function(h) {
                    /**
                     * 在执行createElement之前确定好内容方便，容易理解
                     * 但是如果整个组件里面好多if判断，有些还不是组件data的根级别属性。
                     *
                     * 在createElement里面判断，
                     * 由于第三个参数是字符串和数组，字符串字面量和数组字面量都不可以执行if，
                     * 但是可以执行表达式，
                     * 我们可以执行自执行函数表达式来得到我们想要的值 或者 三目运算符
                     */
                    return h(
                        // 第一参数
                        "div",
                        // 第三参数
                        [
                            function() {
                                let dom;

                                if (this.num === 1) {
                                    dom = h("div", "这是数据为1时，显示的内容。Lorem.");
                                } else if (this.num === 2) {
                                    dom = h("div", "这是数据为2时，显示的内容。Lorem, ipsum.");
                                } else {
                                    dom = h("div", "这是数据为其他时，显示的内容。Lorem, ipsum dolor.");
                                }

                                return dom;
                            }.call(this)
                        ]
                    );
                },
                props: ["num"]
            },
            simple3: {
                render: function(h) {
                    /**
                     * 在执行createElement之前确定好内容方便，容易理解
                     * 但是如果整个组件里面好多if判断，有些还不是组件data的根级别属性。
                     *
                     * 在createElement里面判断，
                     * 由于第三个参数是字符串和数组，字符串字面量和数组字面量都不可以执行if，
                     * 但是可以执行表达式，
                     * 我们可以执行自执行函数表达式来得到我们想要的值 或者 三目运算符(vue内部就是使用三目的)
                     */
                    return h(
                        // 第一参数
                        "div",
                        // 第三参数
                        [
                            this.num===1? // if
                            h("div", "这是数据为1时，显示的内容。Lorem."):
                            this.num===2? // else if
                            h("div", "这是数据为2时，显示的内容。Lorem, ipsum."):
                            h("div", "这是数据为其他时，显示的内容。Lorem, ipsum dolor.")
                        ]
                    );
                },
                props: ["num"]
            },

            multiple: {
                render: function(h) {
                    return h(
                        // 第一参数
                        "div",
                        // 第三参数
                        [
                            this.num >= 1 // if
                                ? h("div", "这是数据为1时，显示的内容。Lorem.")
                                : "",

                            this.num >= 2 //
                                ? h("div", "这是数据为2时，显示的内容。Lorem, ipsum.")
                                : this._e(),

                            this.num >= 3 //
                                ? h("div", "这是数据为3时，显示的内容。Lorem, ipsum dolor.")
                                : this._e()
                        ]
                    );
                },
                props:["num"]
            }
        }
    };


    // <div>
    //     <p v-if="num">123123</p>
    //     <div>Lorem, ipsum dolor.</div>
    //     <p v-if="num">123123</p>
    //     <p v-else-if="str">123123</p>
    //     <p v-else-if="bool">123123</p>
    //     <p v-else>123123</p>
    // </div>
    // 通过 ./getRender/getRender.vue 里面查看
    // var render = function() {
    //     var _vm = this
    //     var _h = _vm.$createElement
    //     var _c = _vm._self._c || _h
    //     return _c("div", [
    //         _vm.num ? _c("p", [_vm._v("123123")]) : _vm._e(),
    //         _vm._v(" "),
    //         _c("div", [_vm._v("Lorem, ipsum dolor.")]),
    //         _vm._v(" "),
    //         _vm.num
    //         ? _c("p", [_vm._v("123123")])
    //         : _vm.str
    //             ? _c("p", [_vm._v("123123")])
    //             : _vm.bool
    //             ? _c("p", [_vm._v("123123")])
    //             : _c("p", [_vm._v("123123")])
    //     ])
    // }
</script>

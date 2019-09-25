<style lang="less" scoped>
    .component-wrap,
    .wrap {
        padding: 20px;
        margin: 20px 0;
        box-shadow: 5px 6px 5px rgba(158, 158, 158, 0.37), 0px 0px 12px rgba(0, 0, 0, 0.1);
        &.red {
            outline: 1px solid red;
        }
    }
</style>
<script>
    /* 组件对象 */
    import componentA from "./widget/component-a";
    let componentB = {
        template:
        `<div class="component-wrap">
            <h3>组件B</h3>
            <p>{{str}}</p>
            <p><button @click='fn'>按钮</button></p>
        </div>`,
        data() {
            return {
                str: "Lorem, ipsum dolor."
            };
        },
        methods: {
            fn() {
                console.log("点击");
            }
        }
    };
    let componentC = {
        render: function(h) {
            return h(
                "div",
                {
                    class: ["component-wrap"]
                },
                [
                    h("h3", "组件C"),
                    h("p", this.str),
                    h("p", [
                        h(
                            "button",
                            {
                                on: {
                                    click: this.fn
                                }
                            },
                            "按钮"
                        )
                    ])
                ]
            );
        },
        template: `<div>fuck</div>`,
        data() {
            return {
                str: "Lorem, ipsum dolor."
            };
        },
        methods: {
            fn() {
                console.log("点击");
            }
        }
    };

    export default {
        render(createElement) {
            // createElement函数 返回 VNode 虚拟节点。
            // render函数需要返回一个VNode供组件使用
            let h = createElement || this.$createElement;
            let _vm = this;

            /* 非组件 */
            let dom = createElement(
                /**
                 * 必选
                 * {String | Object | Function}
                 *
                 * String：html标签、全局定义的组件
                 * Object：组件选项对象
                 * function：解析上述任何一种的一个 async 异步函数。
                 */
                "div",
                /**
                 * data 可选
                 */
                {
                    // 和`v-bind:class`一样的 API
                    class: {
                        foo: true,
                        bar: false,
                        container: true
                    },
                    // 正常的 HTML 特性
                    attrs: {
                        id: "foo", // 会被 domProps 的 id 替代，
                        class: "container" // 会被 class 里面的设置替代， 会被 domProps 的 className 替代
                    },
                    // dom属性，是最高优先级，最高控制权，因为直接控制dom
                    domProps: {
                        id: "content",
                        className: "a b c wrap"
                    },

                    // 和`v-bind:style`一样的 API
                    style: {
                        color: "red",
                        fontSize: "14px"
                    },
                    // 事件，如果是html标签，原生事件；如果是组件，则是组件内部使用 `vm.$emit` 触发的事件。
                    on: {
                        click: this.fn, // 要的是函数，所以不要不小心加上()，如果返回值是函数也可以；createElement第二个参数对象this也指向实例
                        mouseenter: function(event) {
                            console.log("%c\n\n\n mouseenter", "font-size:30px;color:red;");
                            console.log("this", this); // this指向null
                            console.log("_vm", _vm);
                            /**
                             * render函数里面的this是指向实例（非箭头函数时）
                             * createElement是在render函数里面执行的，createElement第二个参数对象this也指向实例；但是事件监听器未知是如何调用的，导致事件监听器this执行null
                             */
                        },
                        mouseleave: event => {
                            console.log("%c\n\n\n mouseleave", "font-size:30px;color:red;");
                            console.log("this", this); // 箭头函数，表明createElement第二个参数对象this也指向实例
                        }
                    },
                    // 作为组件是使用，传到本组件的prop
                    props: {
                        prop_a: "a",
                        prop_b: "b"
                    },
                    // 仅用于组件，用于监听原生事件，而不是组件内部使用 `vm.$emit` 触发的事件。
                    nativeOn: {
                        mouseover: this.fn
                    }
                },
                /**
                 * {String | Array} 可选
                 */
                [
                    "<p>Lorem ipsum dolor sit amet.<p>", // 在这里用字符串写标签 , 是得不到标签的
                    createElement("p", "Lorem ipsum dolor sit amet."),
                    createElement("p", this.text)
                ]
            );

            /* 组件 */
            let component_a_VNode = h(
                /**
                 * 组件对象
                 * 第一个参数除了html标签以外，还可以使用组件对象，
                 * 所以当有些事必须使用render的时候，如某些框架（iview）的table，自定义内容是需要render来写的;
                 * 如果内容十分复杂，可以先将内容写成一个组件（推荐单文件组件），然后再render函数里面引用这个组件。
                 */
                componentA,
                // 第二参数
                {
                    props: {
                        str: this.str,
                        num: this.num,
                        bool: this.bool,
                        arr: this.arr,
                        obj: this.obj
                    },
                    on: {
                        click: this.eventHandler,
                        mouseenter: () => {
                            console.log("this", this);
                            this.eventHandler();
                        },
                        change() {
                            console.log("this", this);
                            console.log("_vm", _vm);
                            _vm.eventHandler("自定义change事件");
                        },
                        clickBtn: this.eventHandler
                    },
                    nativeOn: {
                        click: this.eventHandler,
                        mouseenter(event) {
                            _vm.eventHandler("原生mouseenter事件", event);
                        },
                        touchstart: this.eventHandler
                    }
                },
                // 内容（如果组件，就是插槽内容）
                [
                    this.str, // 不指定就是默认插槽
                    h("p",{
                        // 作为组件的插槽内容，插槽指定名称
                        slot:"footer"
                    },"Here's some contact info")
                ]
            );

            return h("div", [
                dom,
                h("div", [
                    // 组件
                    component_a_VNode,
                    // 组件
                    h(componentB),
                    h(componentC),
                    // 组件，直接使用组件选项
                    h(
                        {
                            template: "<div class='component-wrap'>组件D</div>"
                        },
                        { class: "red" }
                    ),
                    // HTML 标签，直接标签
                    h(
                        "div",
                        {
                            class: "wrap"
                        },
                        "直接标签"
                    )
                ])
            ]);
        },
        data() {
            return {
                str: "Lorem, ipsum dolor.",
                num: Number(ranId(6)),
                bool: Math.random() > 0.5 ? false : true,
                arr: new Array(5).fill("").map(v => ranId(5)),
                obj: {
                    name: "ccc",
                    age: 18
                },
                text: "Lorem ipsum dolor sit amet."
            };
        },
        methods: {
            eventHandler(arg, event) {
                if (arg === undefined) {
                    console.log("%c自定义事件", "font-size:20px;color:red");
                } else if (typeof arg === "string") {
                    console.log(arg);
                } else {
                    console.log("原生", arg.type);
                }
                if (event) {
                    console.log(event);
                    console.log("==================\n\n\n\n\n");
                }
            },
            fn() {
                console.log(this.text);
            }
        }

        // 对于 components 对象中的每个属性来说，其属性名就是自定义元素的名字，其属性值就是这个组件的选项对象。
        // 所以 components 是供字符串模板（单文件组件，template字符串）和html模板使用；对于render来说，不需要自定义标签，直接用就可以了。
    };

    function ranId(n) {
        return Math.random()
            .toString()
            .slice(0 - n);
    }
</script>
<!-- 这是一个路由组件，是一个使用单文件组件的例子，模板写在单文件组件的template标签中，componentA 是一个组件，在当前组件中被引用 -->
<!-- 用于对比，会在另外一个路由组件中，模板使用render函数来写，也引用组件componentA，来了解 createElement （返回VNode） 的用法。 -->
<style lang="less" scoped>
    .component-wrap {
        padding: 20px;
        margin: 20px 0;
        box-shadow: 5px 6px 5px rgba(158, 158, 158, 0.37), 0px 0px 12px rgba(0, 0, 0, 0.1);
    }
</style>
<template>
    <div>
        <!-- 对于组件来说，监听事件不加.native修饰符的话 , 会监听自定义事件-->
        <componentA :str="str" :num="num" :bool="bool" :arr="arr" :obj="obj" @click="eventHandler" @mouseenter="eventHandler" @change="eventHandler('自定义change事件')" @clickBtn="eventHandler" @click.native="eventHandler" @mouseenter.native="eventHandler('原生mouseenter事件',$event)" @touchstart.native="eventHandler">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, atque animi, sunt dolores modi excepturi molestiae aspernatur ad ex rerum in eos. Quidem error accusamus ipsam quos vitae officiis cupiditate.</p>
            <template v-slot:footer>
                <p>Here's some contact info</p>
            </template>
        </componentA>

        <componentB></componentB>

        <componentC></componentC>
    </div>
</template>
<script>
    /* 组件对象 */
    import componentA from "./widget/component-a";
    /* 局部组件的本质就是选项组成的对象 */
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
                    h(
                        "p",
                        [
                            h(
                                "button",
                                {
                                    on:{
                                        click:this.fn
                                    }
                                },
                                "按钮"
                            )
                        ]
                    ),
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

    console.log(componentA,componentA.render);
    console.log(componentB);
    console.log(componentC);

    export default {
        data() {
            return {
                str: "Lorem, ipsum dolor.",
                num: Number(ranId(6)),
                bool: Math.random() > 0.5 ? false : true,
                arr: new Array(5).fill("").map(v => ranId(5)),
                obj: {
                    name: "ccc",
                    age: 18
                }
            };
        },
        methods: {
            eventHandler(arg,event) {
                if (arg === undefined) {
                    console.log("%c自定义事件", "font-size:20px;color:red");
                } else if (typeof arg === "string") {
                    console.log(arg);
                } else {
                    console.log("原生", arg.type);
                }
                if(event){
                    console.log(event);
                    console.log("==================");
                }
            }
        },
        components: {
            componentA,
            componentB,
            componentC
        }
    };

    function ranId(n) {
        return Math.random()
            .toString()
            .slice(0 - n);
    }
</script>
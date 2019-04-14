<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <h2>Essential Links</h2>
        <ul>
            <li>
                <a href="https://vuejs.org" target="_blank">Core Docs</a>
            </li>
            <li>
                <a href="https://forum.vuejs.org" target="_blank">Forum</a>
            </li>
            <li>
                <a href="https://chat.vuejs.org" target="_blank">Community Chat</a>
            </li>
            <li>
                <a href="https://twitter.com/vuejs" target="_blank">Twitter</a>
            </li>
            <br>
            <li>
                <a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a>
            </li>
        </ul>
        <h2>Ecosystem</h2>
        <ul>
            <li>
                <a href="http://router.vuejs.org/" target="_blank">vue-router</a>
            </li>
            <li>
                <a href="http://vuex.vuejs.org/" target="_blank">vuex</a>
            </li>
            <li>
                <a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a>
            </li>
            <li>
                <a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a>
            </li>
        </ul>
        <div class="out">
            <div class="middle">
                <div class="in">
                    <p class="inner">
                        <span>haha</span>
                    </p>
                </div>
            </div>
        </div>
        <!-- 通过v-html 创建的dom -->
        <div class="out" v-html="html"></div>
    </div>
</template>

<script>
    console.log($(window), $);
    export default {
        name: "HelloWorld",
        data() {
            return {
                msg: "Welcome to Your Vue.js App",
                html:`
                <div class="middle">
                    <div class="in">
                        <p class="inner">
                            <span>haha</span>
                        </p>
                    </div>
                </div>
                `
            };
        },
        mounted() {
            this.$nextTick(() => {
                /**
                 * 通过自己js生成的dom
                 */
                var mid = document.createElement("div");
                mid.classList.add("middle");
                mid.innerHTML = `
                    <div class="in">
                        <p class="inner">
                            <span>haha</span>
                        </p>
                    </div>
                `
                document.querySelectorAll('.out')[0].appendChild(mid);
            });
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- 当 <style> 标签有 scoped 属性时，它的 CSS 只作用于当前组件中的元素。 -->
<!-- 原理是只有当前组件中的元素有自己独特的 data-v-469af010 自定义属性，编译css也会在选择器上加入属性选择器来确保仅对有这个属性的元素生效。 -->

<!-- 子组件的根元素
使用 scoped 后，父组件的样式将不会渗透到子组件中。不过一个子组件的根节点会同时受其父组件的 scoped CSS 和子组件的 scoped CSS 的影响。这样设计是为了让父组件可以从布局的角度出发，调整其子组件根元素的样式。 -->
<!-- 子组件中元素 要不就是没有data-v-xxxxxx 如:data-v-469af010  要不是就是和父组件不一样的data-v-xxxxxx -->
<!-- 有了data-v-xxxxxx，样式就可以通过属性选择器却区分各个页面，样式就可以精确到某个页面的元素，加了scoped之后编译出来的选择器末尾都会有[data-v-xxxxxx] -->


<!-- 如果你希望 scoped 样式中的一个选择器能够作用得“更深”，例如影响子组件，你可以使用 >>> 操作符： -->
<!-- 有些像 Sass 之类的预处理器无法正确解析 >>>。这种情况下你可以使用 /deep/ 操作符取而代之——这是一个 >>> 的别名，同样可以正常工作。 -->
<!-- 加了>>> 或者 /deep/ ，就只会在加操作符的上一层父子选择器附上[data-v-xxxxxx]，所以后面的父子选择器就不会附上[data-v-xxxxxx]，所以就可以影响符合这种父子结构的html，也就可以作用更深了 -->

<!-- 通过 v-html 创建的 DOM 内容（或者通过自己写的js创建的 DOM 内容）(即使不是在当前组件模板中出现过的dom)不受 scoped 样式影响，但是你仍然可以通过深度作用选择器来为他们设置样式。 -->
<!-- 通过 v-html 创建的 DOM 内容（或者通过自己写的js创建的 DOM 内容）(即使不是在当前组件模板中出现过的dom)是没有 data-v-xxxxx 属性的 -->

<style scoped>
    h1,
    h2 {
        font-weight: normal;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
</style>
<style lang="less" scoped>
    .out {
        .middle {
            .in {
                .inner {
                    span {
                        font-size: 30px;
                        color: #f00;
                    }
                }
            }
        }
    }
    // 选择器编译成这样 .out .middle .in .inner span[data-v-469af010]
    // 因为 data-v-xxxxx 属性是当前组件的html，和css选择器加的是一样的；所以组件不同 data-v-xxxxx 就不同，所以data-v-xxxxx 加在父子选择的末尾一层，就只能是作用到当前组件的元素，因为只有当前组件的元素加的xxxxx和样式中属性选择器的xxxxx是一样。别的组件就是别的xxxxx，所以属性选择器不会匹配上别的组件的元素，自然就不能给别的元素的组件设置样式了
    // 通过 v-html 创建的 DOM 内容（或者通过自己写的js创建的 DOM 内容）(即使不是在当前组件模板中出现过的dom)是没有 data-v-xxxxx 属性的，所以样式也同样作用不到通过js生成出来的dom。

    .out {
        /deep/.middle {
            .in {
                .inner {
                    font-size: 20px;
                    color: #00f;
                }
            }
        }
    }
    // 选择器编译成这样 .out[data-v-469af010] .middle .in .inner
    // 所以这样只要.out 的子孙元素符合 .middle .in .inner 的嵌套结构，样式就有效。所以就可以作用更深，可以作用到子组件和通过 v-html 创建的 DOM 内容（或者通自己写的过js创建的 DOM 内容）
</style>


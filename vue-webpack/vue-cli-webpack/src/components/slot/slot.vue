<!-- 插槽用法 -->
<style lang="less" scoped>
    .cup {
        padding: 10px;
        margin: 30px 0;
        box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
    }
    ul > li {
        text-align: center;
    }
</style>
<template>
    <div>
        <p>内容由父组件决定</p>

        <h3>情况1</h3>
        <cup></cup>

        <h3>情况2</h3>
        <cup>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, est sunt laboriosam delectus facere, quae corrupti non recusandae eius, quis aut doloremque ex excepturi nulla minus esse nemo nobis fugiat!</p>
        </cup>

        <h3>情况3</h3>
        <cup>
            <p slot="top">top</p>
            <p slot="top">第二行{{text}}</p>
            <p>啊啊啊啊</p>
            <p slot="bottom">底部</p>
        </cup>

        <h3>情况4</h3>
        <cup>
            <ul>
                <li v-for="val in arr">
                    <button>{{val}}</button>
                </li>
            </ul>
        </cup>
    </div>
</template>
<script>
    import cup from "../widget/slot-widget.vue";
    export default {
        data() {
            return {
                text: "haha",
                arr: new Array(10).fill("").map(v => {
                    return Math.random()
                        .toString()
                        .slice(2);
                })
            };
        },
        components: {
            cup
        }
    };
</script>
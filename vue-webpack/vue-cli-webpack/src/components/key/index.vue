<template>
    <div>
        <p>遍历组件中使用key</p>
        <p>由于没有加key，所以组件是复用，删除时并没有真正删除对应的组件，而是组件留下来，只是传进去的值改变，然后组件的内容显示为新的内容。但是实际对应的数据项（arr的元素）已经变了</p>
        {{str}}
        <keyComponent v-for="(val,index) in arr" @click.native="remove(index)" :index="val.index" :data="val" :id="val.num"></keyComponent>
        <hr />
        <p>加上key，每个组件就对应唯一的数据项（arr的元素），数据删除了，组件也删除</p>
        <!-- <keyComponent v-for="(val,index) in arr" @click.native="remove(index)" :index="val.index" :data="val" :id="val.num" :key="val.num"></keyComponent> -->
    </div>
</template>
<script>
    import keyComponent from "./component.vue";
    export default {
        data() {
            return {
                arr: new Array(5).fill("").map((v, i) => {
                    return {
                        index: i,
                        num: Math.random()
                            .toString()
                            .slice(-3)
                    };
                }),
                str: ""
            };
        },
        methods: {
            remove(index) {
                this.arr.splice(index, 1);
            }
        },
        created() {
            this.str = this.arr.map(v => v.num).toString();
        },
        components: {
            keyComponent
        }
    };
</script>
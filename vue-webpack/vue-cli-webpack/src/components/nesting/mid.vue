<!-- 多层嵌套 中层 -->
<style lang="less" scoped>
    .mid {
        padding: 10px;
        margin: 10px;
        box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.3);
        label {
            display: block;
            margin: 10px 0;
        }
    }
</style>
<template>
    <div class="mid">
        <label>
            <span>float</span>
            <input type="checkbox" v-model="float" />
        </label>
        <label>
            <span>datas.name</span>
            <input type="text" v-model="datas.name" />
        </label>
        <label>
            <span>datas.age</span>
            <input type="text" v-model="datas.age" />
        </label>
        <button @click="fn">直接修改datas</button>

        <!-- 内嵌 -->
        <inE></inE>
    </div>
</template>
<script>
    import inE from "./in";
    export default {
        components: {
            inE
        },
        props: ["value"],
        data() {
            return {
                float: this.value.show,
                datas: {
                    name: "ccc",
                    age: 18
                }
            };
        },
        methods: {
            fn() {
                this.datas = {
                    name: "meme",
                    age: 17
                };
            }
        },
        watch: {
            value: {
                handler(val) {
                    console.log("value", JSON.stringify(val));
                    this.float = val.show;
                    if (val.datas) {
                        this.datas = val.datas;
                    }
                },
                deep: true
            },
            float: {
                handler(val) {
                    this.value.show = val;
                    console.log("float", val);
                    this.$emit("input", this.value);
                },
                deep: true
            },
            datas: {
                handler(val) {
                    console.log("datas", JSON.stringify(val));
                    let obj = {
                        show: this.float,
                        datas: this.datas
                    };
                    this.$emit("input", obj);
                },
                deep: true
            }
        }
    };
</script>
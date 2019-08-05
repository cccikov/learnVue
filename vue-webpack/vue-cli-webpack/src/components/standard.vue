<template>
    <div>Lorem, ipsum dolor.</div>
</template>
<script>
    export default {
        /**
         * props
         * data
         * methods
         * computed
         * watch
         * components
         *
         * beforeRouteEnter
         * beforeRouteLeave
         *
         * beforeCreate
         * created
         * mounted
         * destroyed
         */
        props:[],
        data() {
            return {
                select: [], // 选中的块，原始数据，绑定数据
                sortData: {}, // 整理好的数据
                timeData: {}, // 转化为时间后的数据
                multiple: [], // 选择时的数据
                twoPoint: [], // 记录选择的两个点（或者点击的一个点）

                /* 禁止在变量后面加上数字来区分变量 */
                data1:{}, // xxx数据
                data2:{} // xxx数据
            };
        },
        methods: {
            /**
             * init 初始化
             */
            init() {
                this.getData();
                this.select = [1, 2];
                this.funDoc();
                console.log("init");
            },
            /**
             * 函数注释标准
             * @param {String} str 字符串
             * @param {string|number} num 字符串或者数字
             * @param {boolean} bool 布尔值
             * @param {{name:string,age:string|num}} obj name-名字，age-年龄
             * @param {Array<string|number|boolean>} arr 字符串或者数字或者布尔值组成的数组
             * @return {*}  任何值
             */
            funDoc(str, num, bool, obj, arr) {
                return "函数注释标准";
            },
            /**
             * 获取数据 （命名可以使用接口名）
             * @param {String} id id
             * @return {Array<String>} 结果
             */
            getData(id) {},
        },
        computed: {},
        watch: {},
        components:{},
        beforeCreate() {},
        created() {
            this.init();
        },
        mounted() {},
        destroyed() {}
    };
</script>
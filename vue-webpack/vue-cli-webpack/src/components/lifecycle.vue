<template>
    <!-- template标签相当于 render函数或者template属性 -->
    <div>
        <h5 class="title">lifecycle</h5>
        <ul>
            <li v-for="val in arr">{{val}}</li>
        </ul>
        <router-link to="/"> index </router-link>
    </div>
</template>
<script>
export default {
    data() {
        return {
            num: 123,
            arr: []
        };
    },
    methods: {
        eventHandle(e) {
            console.log(e.target);
        }
    },
    beforeCreate() {
        console.clear();
        console.log("实例创建前", this);
    },
    created() {
        console.log("实例创建了", this);
        console.log("一般在这个钩子函数进行init的操作，比如请求数据");
        setTimeout(() => {
            this.arr = [1, 2, 3, 4, 5, 6];
        }, 300);
    },
    beforeMount() {
        console.log("挂载开始前", this);
    },
    mounted() {
        console.log("挂载了", this);
        this.$nextTick(() => { // 将回调延迟到下次 DOM 更新循环之后执行，即表示dom已经根据数据渲染出来了
            // Code that will run only after the
            // entire view has been rendered
            console.log("视图已经渲染完毕了，可以进行一些获取dom的操作了", this);
            console.log(document.querySelectorAll(".title")[0]);
            console.log(document.querySelectorAll("li"));
            document.addEventListener("click", this.eventHandle, false);
        });
    },
    beforeUpdate() {
        console.log("数据更新前");
    },
    updated() {
        console.log("数据更新后");
        this.$nextTick(() => { // 将回调延迟到下次 DOM 更新循环之后执行，即表示dom已经根据更新的数据渲染出来了
            // Code that will run only after the
            // entire view has been re-rendered
            console.log("视图已经重新渲染完毕了，可以进行一些获取dom的操作了", this);
            console.log(document.querySelectorAll(".title")[0]);
            console.log(document.querySelectorAll("li"));
        });
    },
    beforeDestroy() {
        console.log("销毁前", this);
        console.log("在这里removeEventListener");
        document.removeEventListener("click", this.eventHandle, false);
    },
    destroyed() {
        console.log("销毁了", this);
        console.log("在这里removeEventListener");
        document.removeEventListener("click", this.eventHandle, false);
    }
};

</script>
<style scoped lang='less'>
a {
    display: block;
}

</style>

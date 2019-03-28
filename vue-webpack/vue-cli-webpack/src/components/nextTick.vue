<template>
    <!-- template标签相当于 render函数或者template属性 -->
    <div>
        <div>
            <button @click="changeData">改变数据</button>
        </div>
        <div>
            <input type="text" v-model="text">
        </div>
        <div>
            <template v-if="show">
                <p class="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam dignissimos non voluptas possimus nobis esse consequuntur porro optio debitis atque. Molestias ex dolorem numquam animi inventore aut assumenda voluptatibus voluptatum?</p>
            </template>
        </div>
        <div>
            <ul class="list">
                <li v-for="(val,index) in arr" :key="index" class="item">{{val}}</li>
            </ul>
        </div>

        <div>
            <p>改变数据后直接获取的dom信息都是不对的，这些dom信息都是改变数据前的。因为改变数据后，还没有重新渲染，立即获取的话，还是获取旧的dom信息；只有等到再次渲染的后，即nextTick之后才会获得新数据渲染的dom的信息。</p>
            <p>涉及改变数据后要获得dom或者dom的属性（数据会影响dom的时候，基本都会），应该等到nextTick之后在操作。</p>
            <p>nextTick里面的回调表示，数据变化后，vue再次渲染了这些数据（完成更新 DOM），就会触发里面的回调。</p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                text: "hi",
                show: true,
                arr: []
            };
        },
        methods: {
            changeData(){
                this.changeText();
                this.changeShow();
                this.changeArr();
                console.log("%c\n\n数据改变立即获取","font-size:20px;color:red");
                console.log("input的值",document.querySelectorAll("input")[0].value);
                console.log("段落的dom",document.querySelectorAll(".paragraph")[0]);
                console.log("列表的dom集合",document.querySelectorAll(".item"));
                this.$nextTick(()=>{
                    console.log("%cnextTick之后","font-size:20px;color:blue")
                    console.log("input的值",document.querySelectorAll("input")[0].value);
                    console.log("段落的dom",document.querySelectorAll(".paragraph")[0]);
                    console.log("列表的dom集合",document.querySelectorAll(".item"));
                });
            },
            changeText() {
                if (this.text == "hi") {
                    this.text = "hello";
                } else {
                    this.text = "hi";
                }
            },
            changeShow() {
                this.show = !this.show;
            },
            changeArr() {
                if (this.arr.length < 8) {
                    for (let i = 0; i < 4; i++) {
                        this.arr.push(Math.random());
                    }
                } else {
                    this.arr.splice(0, 4);
                }
            }
        }
    };
</script>


<style scoped lang='less'>
    * {
        margin: 0px;
    }
    div + div {
        margin: 15px 0 0;
    }
</style>

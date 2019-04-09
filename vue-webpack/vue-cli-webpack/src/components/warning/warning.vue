<style lang="less" scoped>
    .demo {
        padding: 12px;
        box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);
    }
</style>

<template>
    <div>
        <div class="demo">
            <h5>坑一：假如有一个自动在补0的输入框，确保都是长度为3的数字字符串，比如001、085,、348</h5>
            <input type="text" :value="num" @input="demo1_input">
            {{this.num}}
            <p>
                默认是000
                <br>输入1的时候，就会变成001
                <br>再次输入1的时候，this.num还是001，但是输入框显示的是1
            </p>
            <p>原因：vue是通过监听数据的变化来重新渲染页面，由于之前输入过1，this.num就变成001；之后无论输入1 01，this.num的值都是一样，所以不会触发渲染，所以input就会显示的是输入的内容。</p>
            <p>解决方式，本来对于这种处理方式就不太好，如果我先输入12，先输入1的时候就会变成001，要退格才可以输入12，我们可以改变监听的事件；或者采用节流方式，不要立即改变，停止输入1秒后才改变</p>
            <input type="text" :value="num" @blur="demo1_input">
            {{this.num}}
            <p>或者不要用对input的value进行绑定</p>
            <input type="text" @input="inputIdentification">
            {{idNum}}
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                num: "0",
                idNum: ""
            };
        },
        created() {
            this.demo1Init();
        },
        methods: {
            demo1Init() {
                this.num = this.addZero(this.num);
            },
            addZero(num) {
                num = String(num);
                var len = num.length;
                if (len < 3) {
                    return new Array(3 - len).fill("0").join("") + num;
                } else {
                    return num;
                }
            },
            inputIdentification(e) {
                let that = e.currentTarget;
                let value = that.value;
                value = value.replace(/\s+/g, "");
                this.identification = value;
                if (value.length > 6 && value.length <= 14) {
                    value = value.slice(0, 6) + " " + value.slice(6);
                } else if (value.length > 14) {
                    value = value.slice(0, 6) + " " + value.slice(6, 14) + " " + value.slice(14);
                }
                that.value = value;
                this.idNum = value;
            },
            demo1_input(e) {
                if (Number(e.target.value) !== 0) {
                    var num = this.addZero(e.target.value);
                    this.num = num;
                }
            }
        }
    };
</script>
<template>
    <div class="wrap" @click.stop>
        <input type="text" @focus="showFloat" v-model="text" />
        <div @click.stop.prevent class="picker" v-show="show" :class="{active:active}" @transitionend="transitionend">
            <weekPicker v-model="date" @pick="hideFloat"></weekPicker>
        </div>
    </div>
</template>
<script>
    import weekPicker from "./weekPicker.vue";
    export default {
        components: {
            weekPicker
        },
        data() {
            return {
                show: false,
                date: [],
                active: false
            };
        },
        computed: {
            text() {
                return this.date.join("-");
            }
        },
        methods: {
            showFloat() {
                this.show = true;
                document.addEventListener("click", this.hideFloat, false);
                setTimeout(() => {
                    this.active = true;
                }, 1000/30);
            },
            hideFloat() {
                console.log("hide " + Date.now());
                this.active = false;
            },
            transitionend(e) {
                var that = e.currentTarget;
                var tar = e.target;
                if (that === tar && e.propertyName =="opacity" && !this.active) {
                    this.show = false;
                }
            }
        },
        watch: {
            date(val) {
                if (Array.isArray(val)) {
                    this.$emit("input", val.map(v=>new Date(v).getTime()));
                }
            }
        },
        destroyed() {
            document.removeEventListener("click", this.hideFloat, false);
        }
    };
</script>
<style lang="less" scoped>
    .wrap {
        position: relative;
        .picker {
            position: absolute;
            top: 100%;
            left: 0;
            z-index: 800;
            transform: translate3d(0, 3px, 0) scaleY(0.8);
            opacity: 0;
            transition: transform 300ms, opacity 300ms;
            &.active {
                opacity: 1;
                transform: translate3d(0, 3px, 0) scaleY(1);
            }
        }
    }
</style>


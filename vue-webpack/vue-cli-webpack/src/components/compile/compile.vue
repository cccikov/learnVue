  <!-- <template>
    <div>
        <p>compile</p>
        <p>将模板字符串编译render</p>
        <ul>
            <li v-for="val in arr" :key="val">{{val}}</li>
        </ul>
    </div>
</template>-->
<script>
    import Vue from "vue";
    let str = `
        <div>
            <p>compile</p>
            <p>将模板字符串编译render</p>
            <ul>
                <li v-for="val in arr" :key="val">{{val}}</li>
            </ul>
        </div>
        `;
    export default {
        render: Vue.compile(str).render,
        created() {
            console.log(Vue.compile(str).render)
        },
        data() {
            return {
                arr: new Array(10).fill("").map((val, index) => {
                    return index;
                })
            };
        }
    };
</script>
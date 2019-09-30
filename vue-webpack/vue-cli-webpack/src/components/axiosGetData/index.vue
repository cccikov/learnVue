<template>
    <div>
        <button @click="getData">getData</button>
    </div>
</template>
<script>
    export default {
        methods: {
            getData() {
                this.$axios({
                    url: "/mock/api/list",
                    method: "post"
                })
                    .then(res => {
                        console.log(res.data.data);
                    })
                    .catch(err => {
                        console.error(err);
                    });
            }
        }
    };
</script>
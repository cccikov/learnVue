<template>
    <div>
        <label>
            <span>123</span>
            <picker v-model="date"></picker>
        </label>
    </div>
</template>
<script>
    import picker from "./weekPickerInput.vue";
    export default {
        components: {
            picker
        },
        data() {
            return {
                date: []
            };
        },
        watch: {
            date(val){
                console.log(val);
            }
        },
    };
</script>
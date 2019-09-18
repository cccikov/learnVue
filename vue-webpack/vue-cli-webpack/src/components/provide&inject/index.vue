<template>
    <div class="wrap">
        <demo1></demo1>
        <demo2></demo2>
        <demo3></demo3>
    </div>
</template>
<script>
    import demo1 from "./demo1/first.vue";
    import demo2 from "./demo2/first.vue";
    import demo3 from "./demo3/first.vue";
    export default {
        components: {
            demo1,
            demo2,
            demo3
        }
    };
</script>
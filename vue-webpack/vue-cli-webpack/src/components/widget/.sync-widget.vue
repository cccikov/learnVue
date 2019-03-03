<template>
    <div>
		<p>{{text}}</p>
		<button @click="updateText('子组件传的值')">按钮</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        props: ["text"],
        methods: {
            updateText(str) {
				console.log(str);
                this.$emit("update:text", str);
            }
        }
    };
</script>
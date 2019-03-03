<template>
    <div>
		<div>
			<p>{{str}}</p>
			<sync v-bind:text.sync="str"></sync>
		</div>
    </div>
</template>

<script>
    import sync from "./widget/.sync-widget.vue";
    export default {
		components:{
			sync
		},
        data() {
            return {
                str: "这是父组件的字符串"
            };
        }
    };
</script>
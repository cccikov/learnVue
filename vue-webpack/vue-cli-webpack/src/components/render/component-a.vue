<style lang="less" scoped>
    .wrap {
        padding: 20px;
        margin: 20px 0;
        color: #333;
        box-shadow: 5px 6px 5px rgba(158, 158, 158, 0.37), 0px 0px 12px rgba(0, 0, 0, 0.1);
        * {
            padding: 0;
            margin: 0;
        }
        ul,
        li {
            list-style: none;
        }
        > h3.title {
            font-size: 15px;
        }
        .section {
            display: flex;
            margin: 15px 0;
            > .left {
                flex: 0 0 auto;
                padding: 0 12px 0 0;
            }
            .right {
                flex: 1 1 auto;
            }
        }
    }
</style>
<template>
    <div class="wrap">
        <h3 class="title">组件a</h3>
        <!-- props -->
        <!-- props -->
        <!-- props -->
        <div class="section">
            <span class="left">props:</span>
            <ul class="right">
                <li>
                    <strong>str</strong>
                    : {{str}}
                </li>
                <li>
                    <strong>num</strong>
                    : {{num}}
                </li>
                <li>
                    <strong>bool</strong>
                    : {{bool}}
                </li>
                <li>
                    <strong>arr</strong>
                    : {{arr}}
                </li>
                <li>
                    <strong>obj</strong>
                    : {{obj}}
                </li>
            </ul>
        </div>
        <!-- slot -->
        <!-- slot -->
        <!-- slot -->
        <div class="section">
            <span class="left">slot</span>
            <ul class="right">
                <li>
                    <strong>slot default</strong>
                    <slot></slot>
                </li>
                <li>
                    <strong>slot other</strong>
                    <slot name="footer"></slot>
                </li>
            </ul>
        </div>
        <!-- event -->
        <!-- event -->
        <!-- event -->
        <div class="section">
            <span class="left">event</span>
            <div>
                <button @click.stop="$emit('click')">触发自定义click事件</button>
                <button @click.stop="$emit('mouseenter')">触发自定义mouseenter事件</button>
                <button @click.stop="$emit('touchstart')">触发自定义touchstart事件</button>
                <button @click.stop="$emit('change')">触发自定义change事件</button>
                <button @click.stop="$emit('input')">触发自定义input事件</button>
                <button @click.stop="$emit('submit')">触发自定义submit事件</button>
                <button @click.stop="$emit('clickBtn')">触发自定义clickBtn事件</button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ["str", "num", "bool", "arr", "obj"]
    };
</script>
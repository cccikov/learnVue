<template>
    <div class="wrap">
        <div v-if="$scopedSlots.default" class="title">
            <p>有默认插槽</p>
            <slot name="default" :name-out="name"></slot>
        </div>
        <div>
            <table>
                <tr>
                    <th>
                        <div class="cell-content">名字</div>
                    </th>
                    <th>
                        <div class="cell-content">选项</div>
                    </th>
                    <th>
                        <div class="cell-content">选项</div>
                    </th>
                    <th>
                        <div class="cell-content">选项</div>
                    </th>
                    <th>
                        <div class="cell-content">选项</div>
                    </th>
                    <th>
                        <div class="cell-content">选项</div>
                    </th>
                    <th>
                        <div class="cell-content">选项</div>
                    </th>
                    <th>
                        <div class="cell-content">选项</div>
                    </th>
                    <th>
                        <div class="cell-content">选项</div>
                    </th>
                    <th>
                        <div class="cell-content">选项</div>
                    </th>
                    <th>
                        <div class="cell-content">选项</div>
                    </th>
                    <slot name="th"></slot>
                </tr>
                <template v-for="(company,company_index) in tableData">
                    <tr>
                        <td>
                            <div class="cell-content">{{company.companyName}}</div>
                        </td>
                        <td colspan="10"></td>
                        <!-- 单组操作 -->
                        <slot name="part" :companyName="company.companyName" class-name="action" :rowspan="company.list.length+1"></slot>
                        <!-- 全部操作 -->
                        <template v-if="company_index == 0">
                            <slot name="all" class-name="all-action" rowspan="0"></slot>
                        </template>
                    </tr>
                    <tr v-for="(product,product_index) in company.list">
                        <td>
                            <div class="cell-content"></div>
                        </td>
                        <td class="border first">
                            <div class="cell-content">{{product.str}}</div>
                        </td>
                        <td class="border">
                            <div class="cell-content">{{product.str}}</div>
                        </td>
                        <td class="border">
                            <div class="cell-content">{{product.str}}</div>
                        </td>
                        <td class="border">
                            <div class="cell-content">{{product.str}}</div>
                        </td>
                        <td class="border">
                            <div class="cell-content">{{product.str}}</div>
                        </td>
                        <td class="border">
                            <div class="cell-content">{{product.str}}</div>
                        </td>
                        <td class="border">
                            <div class="cell-content">{{product.str}}</div>
                        </td>
                        <td class="border">
                            <div class="cell-content">{{product.str}}</div>
                        </td>
                        <td class="border">
                            <div class="cell-content">{{product.str}}</div>
                        </td>
                        <td class="border end">
                            <div class="cell-content">{{product.str}}</div>
                        </td>
                    </tr>
                </template>
            </table>
        </div>
        <p class="btn-wrap">
            <button @click="btn">点击查看slot</button>
        </p>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                name: "测试slot",
                tableData: [
                    {
                        companyName: "乔欣",
                        list: new Array(parseInt(Math.random() * 10 + 1)).fill("").map(v => {
                            return {
                                str: "---"
                            };
                        })
                    },
                    {
                        companyName: "玉兰",
                        list: new Array(parseInt(Math.random() * 10 + 1)).fill("").map(v => {
                            return {
                                str: "---"
                            };
                        })
                    },
                    {
                        companyName: "梦尚智美",
                        list: new Array(parseInt(Math.random() * 10 + 1)).fill("").map(v => {
                            return {
                                str: "---"
                            };
                        })
                    }
                ]
            };
        },
        methods: {
            btn() {
                console.log(this.$slots);
                console.log(this.$scopedSlots);
            }
        },
        computed: {}
    };
</script>

<style lang="less" scoped>
    .cell-content {
        min-height: 40px;
        line-height: 40px;
        min-width: 76px;
        text-align: center;
        padding: 5px 12px;
        white-space: nowrap;
    }
    table {
        border-collapse: collapse;
        tr {
            th {
                background: #eee;
                vertical-align: middle;
            }
            td {
                &.border {
                    border-top: 1px solid #eee;
                    border-bottom: 1px solid #eee;
                    &.first {
                        border-left: 1px solid #eee;
                    }
                    &.end {
                        border-right: 1px solid #eee;
                    }
                }
                &.action {
                    border: 1px solid #eee;
                }
                &.all-action {
                    border: 1px solid #eee;
                }
            }
        }
    }
    .wrap {
        display: inline-block;
        padding: 12px;
        box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.3);
        > .title {
            > * {
                margin: 5px;
                color: #404040;
                font-size: 16px;
            }
        }
        .btn-wrap {
            text-align: center;
        }
    }
</style>
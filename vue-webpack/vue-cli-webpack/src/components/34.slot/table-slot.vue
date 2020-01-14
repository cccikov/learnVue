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
                        <div class="cell-content">{{topname}}</div>
                    </th>
                    <th v-if="column.orderNo">
                        <div class="cell-content">订单号</div>
                    </th>
                    <th v-if="column.productName">
                        <div class="cell-content">产品名称</div>
                    </th>
                    <th v-if="column.productNo">
                        <div class="cell-content">产品编号</div>
                    </th>
                    <th v-if="column.number">
                        <div class="cell-content">数量</div>
                    </th>
                    <th v-if="column.price">
                        <div class="cell-content">单价</div>
                    </th>
                    <slot name="th" content-class-name="cell-content"></slot>
                </tr>
                <template v-for="(company,company_index) in tableData">
                    <tr>
                        <td>
                            <div class="cell-content">{{company.companyName}}</div>
                        </td>
                        <td :colspan="colspan"></td>
                        <!-- 单组操作 -->
                        <slot name="part" :companyName="company.companyName" class-name="action" content-class-name="cell-content" :rowspan="company.list.length+1"></slot>
                        <!-- 全部操作 -->
                        <template v-if="company_index == 0">
                            <slot name="all" class-name="all-action" content-class-name="cell-content" rowspan="0"></slot>
                        </template>
                    </tr>
                    <tr v-for="(product,product_index) in company.list">
                        <td>
                            <div class="cell-content"></div>
                        </td>
                        <td v-if="column.orderNo" class="border">
                            <div class="cell-content">{{product.orderNo}}</div>
                        </td>
                        <td v-if="column.productName" class="border">
                            <div class="cell-content">{{product.productName}}</div>
                        </td>
                        <td v-if="column.productNo" class="border">
                            <div class="cell-content">{{product.productNo}}</div>
                        </td>
                        <td v-if="column.number" class="border">
                            <div class="cell-content">{{product.number}}</div>
                        </td>
                        <td v-if="column.price" class="border">
                            <div class="cell-content">{{product.price}}</div>
                        </td>
                        <!-- 单元格 -->
                        <slot name="td" :row="product" :companyName="company.companyName" content-class-name="cell-content" class-name="border"></slot>
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
        props: {
            tableData: Array,
            colspan: {
                type: [Number, String],
                default: 5
            },
            topname: {
                type: String,
                default: '企业名称'
            }
        },
        data() {
            return {
                name: '测试slot'
            }
        },
        methods: {
            btn() {
                console.log(this.$slots)
                console.log(this.$scopedSlots)
            }
        },
        computed: {
            column() {
                let tableData = this.tableData
                if (Array.isArray(tableData) && tableData.length > 0 && tableData[0].list) {
                    return tableData[0].list[0]
                } else {
                    return []
                }
            }
        }
    }
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
                    &:nth-of-type(2) {
                        border-left: 1px solid #eee;
                    }
                    &:last-of-type {
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
        border-radius: 12px;
        margin: 12px;
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
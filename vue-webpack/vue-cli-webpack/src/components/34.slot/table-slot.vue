<template>
    <div class="table-slot">
        <div v-if="$scopedSlots.default" class="title">
            <p>有默认插槽</p>
            <slot name="default" :name-out="name"></slot>
        </div>
        <div class="table-wrap">
            <table :class="{test:test !== void 0}">
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
                    <!-- 占位 -->
                    <th v-if="!($scopedSlots.all || $scopedSlots.part)">
                        <div class="cell-content"></div>
                    </th>
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
                            <slot v-if="$scopedSlots.all" name="all" class-name="all-action" content-class-name="cell-content" rowspan="0"></slot>
                            <!-- 占位 -->
                            <td v-if="!($scopedSlots.all || $scopedSlots.part)" rowspan="0">
                                <div class="cell-content"></div>
                            </td>
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
            test: null,
            tableData: Array,
            colspan: {
                type: [Number, String],
                default: 5
            },
            topname: {
                type: String,
                default: "企业名称"
            }
        },
        data() {
            return {
                name: "测试slot"
            };
        },
        methods: {
            btn() {
                console.log(this.$slots);
                console.log(this.$scopedSlots);
            }
        },
        computed: {
            column() {
                // 查找有什么表头
                let tableData = this.tableData;
                if (Array.isArray(tableData) && tableData.length > 0) {
                    let obj = {};
                    tableData.forEach(group => {
                        if (Array.isArray(group.list)) {
                            group.list.forEach(line => {
                                Object.keys(line).forEach(key => {
                                    obj[key] = true;
                                });
                            });
                        }
                    });
                    return obj;
                } else {
                    return {};
                }
            }
        }
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
    .table-wrap {
        overflow: auto;
        table {
            min-width: 100%;
            border: 1px solid transparent;
            box-sizing: border-box;
            border-collapse: collapse;
            &.test {
                th,
                td {
                    outline: 1px solid #f00; // 测试
                }
            }
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
    }

    .table-slot {
        padding: 12px;
        border-radius: 12px;
        margin: 12px;
        box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.3);
        > .title {
            > * {
                margin: 5px;
            }
        }
        .btn-wrap {
            text-align: center;
        }
    }
</style>
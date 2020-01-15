<template>
    <div>
        <tableSlot test :tableData="tableData"></tableSlot>

        <tableSlot :tableData="tableData" :colspan="6" topname="企业名称">
            <template v-slot:default>
                <h1>这是插槽</h1>
            </template>
            <!-- 表头 -->
            <!-- 表头 -->
            <!-- 表头 -->
            <template v-slot:th="params">
                <th>
                    <div :class="params.contentClassName">详情</div>
                </th>
                <th>
                    <div :class="params.contentClassName">小按钮</div>
                </th>
                <th>
                    <div :class="params.contentClassName">小按钮</div>
                </th>
                <th>
                    <div :class="params.contentClassName">大按钮</div>
                </th>
                <th>
                    <div :class="params.contentClassName">大按钮</div>
                </th>
            </template>
            <!-- td -->
            <!-- td -->
            <!-- td -->
            <template v-slot:td="data">
                <td :class="data.className">
                    <div :class="data.contentClassName">
                        <a href="javascript:void(0)">查看详情</a>
                    </div>
                </td>
            </template>
            <!-- 小按钮 -->
            <!-- 小按钮 -->
            <!-- 小按钮 -->
            <template v-slot:part="data">
                <td :rowspan="data.rowspan" :class="data.className">
                    <div :class="data.contentClassName">
                        <!-- 读当前组件数据 -->
                        <p>下面是当前组件的数据 ↓</p>
                        <p>当前时间：{{time}}</p>
                        <!-- data 读取slot组件里面传出来的数据 -->
                        <p>下面是当前slot组件的数据 ↓</p>
                        <p>{{data}}</p>
                        <button @click="fn(data)">{{data.companyName}}的小按钮</button>
                    </div>
                </td>
                <td :rowspan="data.rowspan" :class="data.className">
                    <div :class="data.contentClassName">
                        <button @click="fn(data)">第二个{{data.companyName}}小按钮</button>
                    </div>
                </td>
            </template>
            <!-- 大按钮 -->
            <!-- 大按钮 -->
            <!-- 大按钮 -->
            <template v-slot:all="data">
                <td :rowspan="data.rowspan" :class="data.className">
                    <div :class="data.contentClassName">
                        <button>大按钮I</button>
                    </div>
                </td>
                <td :rowspan="data.rowspan" :class="data.className">
                    <div :class="data.contentClassName">
                        <button>大按钮II</button>
                    </div>
                </td>
            </template>
        </tableSlot>


        <tableSlot :tableData="tableData_room" :colspan="5" topname="空间">
            <!-- 表头 -->
            <!-- 表头 -->
            <!-- 表头 -->
            <template #th="data">
                <th>
                    <div :class="data.contentClassName">家具类型</div>
                </th>
                <th>
                    <div :class="data.contentClassName">家具编号</div>
                </th>
                <th>
                    <div :class="data.contentClassName">规格编号</div>
                </th>
                <th>
                    <div :class="data.contentClassName">数量</div>
                </th>
                <th>
                    <div :class="data.contentClassName">单价</div>
                </th>
                <th>
                    <div :class="data.contentClassName">小计</div>
                </th>
                <th>
                    <div :class="data.contentClassName">总价</div>
                </th>
            </template>
            <!-- td -->
            <!-- td -->
            <!-- td -->
            <template #td="data">
                <td :class="data.className">
                    <div :class="data.contentClassName">
                       {{data.row._productName}}
                    </div>
                </td>
                <td :class="data.className">
                    <div :class="data.contentClassName">
                       {{data.row._productNo}}
                    </div>
                </td>
                <td :class="data.className">
                    <div :class="data.contentClassName">
                       {{data.row._orderNo}}
                    </div>
                </td>
                <td :class="data.className">
                    <div :class="data.contentClassName">
                       {{data.row._number}}
                    </div>
                </td>
                <td :class="data.className">
                    <div :class="data.contentClassName">
                       {{data.row._price}}
                    </div>
                </td>
            </template>
            <!-- 小按钮 -->
            <!-- 小按钮 -->
            <!-- 小按钮 -->
            <template #part="data">
                <td :rowspan="data.rowspan" :class="data.className">
                    <div :class="data.contentClassName">
                        ￥ 10000
                    </div>
                </td>
            </template>
            <!-- 大按钮 -->
            <!-- 大按钮 -->
            <!-- 大按钮 -->
            <template #all="data">
                <td :rowspan="data.rowspan" :class="data.className">
                    <div :class="data.contentClassName">
                        ￥ 30000
                    </div>
                </td>
            </template>
        </tableSlot>
    </div>
</template>
<script>
    import tableSlot from './table-slot'
    export default {
        data() {
            return {
                time: new Date().toLocaleString(),
                tableData: [
                    {
                        companyName: '乔欣',
                        list: new Array(parseInt(Math.random() * 7 + 3)).fill('').map((v) => {
                            return {
                                orderNo: getId(16),
                                productName: '家具',
                                productNo: getId(9),
                                number: parseInt(Math.random() * 100 + 1),
                                price: parseInt(Math.random() * 100 + 100) + ' / 件'
                            }
                        })
                    },
                    {
                        companyName: '玉兰',
                        list: new Array(parseInt(Math.random() * 5 + 2)).fill('').map((v) => {
                            return {
                                orderNo: getId(16),
                                productName: '窗帘',
                                productNo: getId(9),
                                number: parseInt(Math.random() * 100 + 1),
                                price: parseInt(Math.random() * 100 + 100) + ' / 件'
                            }
                        })
                    },
                    {
                        companyName: '梦尚智美',
                        list: new Array(parseInt(Math.random() * 10 + 1)).fill('').map((v) => {
                            return {
                                orderNo: getId(16),
                                productName: '饰品',
                                productNo: getId(9),
                                number: parseInt(Math.random() * 100 + 1),
                                price: parseInt(Math.random() * 100 + 100) + ' / 件'
                            }
                        })
                    }
                ],

                tableData_room: [
                    {
                        companyName: '卧室',
                        list: new Array(parseInt(Math.random() * 7 + 3)).fill('').map((v) => {
                            return {
                                _orderNo: getId(16),
                                _productName: '床',
                                _productNo: getId(9),
                                _number: parseInt(Math.random() * 100 + 1),
                                _price: parseInt(Math.random() * 100 + 100) + ' / 件'
                            }
                        })
                    },
                    {
                        companyName: '客厅',
                        list: new Array(parseInt(Math.random() * 5 + 2)).fill('').map((v) => {
                            return {
                                _orderNo: getId(16),
                                _productName: '沙发',
                                _productNo: getId(9),
                                _number: parseInt(Math.random() * 100 + 1),
                                _price: parseInt(Math.random() * 100 + 100) + ' / 件'
                            }
                        })
                    },
                    {
                        companyName: '厨房',
                        list: new Array(parseInt(Math.random() * 10 + 1)).fill('').map((v) => {
                            return {
                                _orderNo: getId(16),
                                _productName: '橱柜',
                                _productNo: getId(9),
                                _number: parseInt(Math.random() * 100 + 1),
                                _price: parseInt(Math.random() * 100 + 100) + ' / 件'
                            }
                        })
                    }
                ]
            }
        },
        methods: {
            fn(arg = {}) {
                alert('执行的是当前组件的方法，传过来的数据是' + JSON.stringify(arg))
            }
        },
        components: {
            tableSlot
        }
    }

    function allWord(lower = true, upper = true, num = true) {
        var lower_letter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
        var upper_letter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        var number = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        return [...(num ? number : []), ...(lower ? lower_letter : []), ...(upper ? upper_letter : [])]
    }

    function getId(len) {
        let letter = allWord()
        let ranLen = letter.length - 1
        let id = ''
        for (let i = 0; i < len; i++) {
            let ran = parseInt(Math.random() * (ranLen + 1))
            id += letter[ran]
        }
        return id
    }
</script>
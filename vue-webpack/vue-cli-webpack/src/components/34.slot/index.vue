<template>
    <div>
        <tableSlot>
            <template v-slot:default>
                <h1>这是插槽</h1>
            </template>
            <!-- 表头 -->
            <!-- 表头 -->
            <!-- 表头 -->
            <template v-slot:th>
                <th>
                    <div class="cell-content">小按钮</div>
                </th>
                <th>
                    <div class="cell-content">小按钮</div>
                </th>
                <th>
                    <div class="cell-content">大按钮</div>
                </th>
                <th>
                    <div class="cell-content">大按钮</div>
                </th>
            </template>
            <!-- 小按钮 -->
            <!-- 小按钮 -->
            <!-- 小按钮 -->
            <template v-slot:part="data">
                <td :rowspan="data.rowspan" :class="data.className">
                    <div class="cell-content">
                        <!-- 读当前组件数据 -->
                        <p>下面是当前组件的数据 ↓</p>
                        <p>当前时间：{{time}}</p>
                        <!-- data 读取slot组件里面传出来的数据 -->
                        <p>下面是当前slot组件的数据 ↓</p>
                        <p>{{data}}</p>
                        <button>{{data.companyName}}的小按钮1</button>
                    </div>
                </td>
                <td :rowspan="data.rowspan" :class="data.className">
                    <div class="cell-content">
                        <button>{{data.companyName}}小按钮2</button>
                    </div>
                </td>
            </template>
            <!-- 大按钮 -->
            <!-- 大按钮 -->
            <!-- 大按钮 -->
            <template v-slot:all="data">
                <td :rowspan="data.rowspan" :class="data.className">
                    <div class="cell-content">
                        <button>大按钮1</button>
                    </div>
                </td>
                <td :rowspan="data.rowspan" :class="data.className">
                    <div class="cell-content">
                        <button>大按钮2</button>
                    </div>
                </td>
            </template>
        </tableSlot>
    </div>
</template>
<script>
    import tableSlot from "./table-slot";
    export default {
        components: {
            tableSlot
        },
        data(){
            return{
                time:new Date().toLocaleString()
            }
        }
    };
</script>
<template>
    <div>
        <!-- 添加表头 -->
        <div>
            <label>
                <span>表头名字</span>
                <input type="text" v-model="name" />
            </label>
            <button @click="add">添加</button>
        </div>

        <p>{{attrs}}</p>
        <p>{{columns}}</p>
        <p>{{tableData}}</p>

        <table>
            <tr>
                <th v-for="head in columns">
                    <div>{{head.name}}</div>
                    <div>{{head.key}}</div>
                </th>
            </tr>
            <tr v-for="line in tableData">
                <td v-for="head in columns">
                    <template v-if="typeof line[head.key] === 'object'">
                        <a href="javascript:void(0)">选择材质</a>
                        <p v-for="(val,key) in line[head.key]">{{key}} -- {{val}}</p>
                    </template>
                    <template v-else-if="head.key === 'name'">
                        <input type="text" v-model="line[head.key]" />
                    </template>
                    <template v-else-if="head.key === 'checkbox'">
                        <label>
                            <span>此项默认</span>
                            <input type="checkbox" :value="line[head.key]" @change />
                        </label>
                    </template>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                name: "",
                attrs: [],
                columns: [], // 表头
                tableData: []
            };
        },
        methods: {
            /**
             * 添加按钮操作
             */
            add() {
                this.addColumns({
                    name: this.name,
                    id: getId(16)
                });
                this.name = "";
            },
            /**
             * 增加表头
             */
            addColumns(attr) {
                this.attrs.push(attr);

                let attrs_columns = this.attrs.map(v => {
                    return {
                        name: v.name,
                        key: v.id // 对应的 tableData 每一行的对象的可以
                    };
                });
                let normal_columns = [
                    {
                        name: "搭配名称",
                        key: "name" // 对应的 tableData 每一行的对象的可以
                    },
                    {
                        name: "默认",
                        key: "checkbox"
                    }
                ];

                this.columns = [...normal_columns, ...attrs_columns];

                let tableDataItem = {};
                this.attrs.forEach(v => {
                    tableDataItem[v.id] = {
                        name: v.name,
                        id: v.id,
                        partId: "",
                        matId: ""
                    };
                });
                tableDataItem.name = "";
                tableDataItem.checkbox = false;
                tableDataItem = JSON.stringify(tableDataItem);

                this.tableData = [JSON.parse(tableDataItem)];
                this.tableData.push(JSON.parse(tableDataItem));
            }
        }
    };

    function allWord(lower = true, upper = true, num = true) {
        var lower_letter = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        var upper_letter = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        var number = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        return [...(num ? number : []), ...(lower ? lower_letter : []), ...(upper ? upper_letter : [])];
    }

    function getId(len) {
        let letter = allWord();
        let ranLen = letter.length - 1;
        let id = "";
        for (let i = 0; i < len; i++) {
            let ran = parseInt(Math.random() * (ranLen + 1));
            id += letter[ran];
        }
        return id;
    }

    function delProperty(obj = {}, property = []) {
        // 返回新对象 在模块里面、严格模式下都可以使用
        let newObj = {};
        Object.keys(obj).forEach(key => {
            if (!property.includes(key)) {
                newObj[key] = obj[key];
            }
        });
        return newObj;
    }
</script>
<style lang="less" scoped>
    table {
        border-collapse: collapse;
        color: #404040;
        th,
        td {
            padding: 3px 12px;
            border: 1px solid #ccc;
            div {
                min-width: 150px;
                white-space: nowrap;
                vertical-align: middle;
                text-align: center;
            }
            p {
                font-size: 12px;
                color: #ccc;
                margin: 0;
                line-height: 1.2;
            }
        }
    }
</style>









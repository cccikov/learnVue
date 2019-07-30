<!-- 一周时间段选择 -->
<template>
    <div>
        <div :class="[select.includes(twoPoint[0])?'del':'add']" id="touch" @mousedown="mousedown" @mousemove="mousemove">
            <p v-for="day in 7" :key="day">
                <span :class="{active:select.includes(day+'-'+hour),selecting:multiple.includes(day+'-'+hour)}" v-for="hour in 48" :key="day+'-'+hour" :data-id="day+'-'+hour"></span>
            </p>
        </div>
        <div v-for="(val,key) in data" :key="key" :data-key="key">星期{{key}}：{{val.join(" ， ")}}</div>
    </div>
</template>
<script>
    /*
     * 执行顺序
     *
     * 绑定事件 mousedown mousemove mouseup
     *
     * mousedown - 记住点下坐标
     *
     * mousemove - 记下当前坐标，多选选中显示multipleHandler()
     *
     * mouseup - 判断是单选还是多选，多选toSelect() - 整理数据sort() - 将数据转化成对应事件data2Date
     */
    export default {
        data() {
            return {
                multiple: [],
                select: [], // 选中的块
                twoPoint: [], // 记录选择的两个点（或者点击的一个点）
                is_mousedown: false,
                data: {}
            };
        },
        created() {
            document.addEventListener("mouseup", this.mouseup, {
                capture: false,
                passive: false
            });
        },
        destroyed() {
            document.removeEventListener("mouseup", this.mouseup, {
                capture: false,
                passive: false
            });
        },
        methods: {
            mousedown(e) {
                e.preventDefault();
                this.is_mousedown = true;
                var tar = e.target;
                this.twoPoint = [tar.getAttribute("data-id")]; // 重制数组并且设置第一个值
            },
            mousemove(e) {
                e.preventDefault();
                if (!this.is_mousedown) {
                    return;
                }
                var tar = e.target;
                this.$set(this.twoPoint, 1, tar.getAttribute("data-id"));
                this.multipleHandler();
            },
            mouseup(e) {
                e.preventDefault();
                this.is_mousedown = false;
                this.toSelect();
            },
            toSelect() {
                if (this.twoPoint.length === 1) {
                    // 只选择一个
                    console.log(this.twoPoint[0]);
                    this.toggleSelect(this.twoPoint[0]);
                } else {
                    if (this.select.includes(this.twoPoint[0])) {
                        this.multiple.forEach(val => {
                            this.removeSelect(val);
                        });
                    } else {
                        this.multiple.forEach(val => {
                            this.addSelect(val);
                        });
                    }
                    this.multiple = [];
                }
                this.sort();
            },
            // 判断有无添加移除（单选逻辑）
            toggleSelect(val) {
                var index = this.select.indexOf(val);
                if (index > -1) {
                    this.select.splice(index, 1);
                } else {
                    this.select.push(val);
                }
            },
            // 只添加（群选逻辑）
            addSelect(val) {
                if (!this.select.includes(val)) {
                    this.select.push(val);
                }
            },
            // 只删除
            removeSelect(val) {
                var index = this.select.indexOf(val);
                if (index > -1) {
                    this.select.splice(index, 1);
                }
            },
            // 群选
            multipleHandler() {
                var point_start = this.twoPoint[0].split("-");
                var point_end = this.twoPoint[1].split("-");
                var day = maxmin(point_start[0], point_end[0]);
                var time = maxmin(point_start[1], point_end[1]);
                var arr = [];
                for (let i = day[0]; i <= day[1]; i++) {
                    for (let j = time[0]; j <= time[1]; j++) {
                        arr.push(i + "-" + j);
                    }
                }
                this.multiple = arr;
            },
            // 整理
            sort() {
                console.clear();
                var obj = {};
                /* 数组转为对象格式 */
                this.select.forEach(val => {
                    val = val.split("-");
                    var key = val[0];
                    var value = Number(val[1]);
                    if (!obj[key]) {
                        obj[key] = [];
                    }
                    obj[key].push(value);
                });

                /* 排序，整理连续 */
                Object.keys(obj).forEach(week => {
                    var ori = obj[week].sort(function(a, b) {
                        return a - b;
                    }); // 排序后的原始数据

                    /* 去连续，连续的分成一组 */
                    var result = []; // 去连续返回结果
                    var last = 0; // 中间变量变量，处理用
                    var arr = []; // 中间变量变量，处理用
                    var max = ori.length - 1;
                    ori.forEach((val, i) => {
                        if (i === 0) {
                            // 第一个，赋值
                            last = val;
                            arr = [val];
                        } else {
                            // 和上一个数对比，来确定，上一个数是否分组
                            if (val - last === 1) {
                                // 连续
                                last = val;
                            } else {
                                if (last != arr[0]) {
                                    arr.push(last);
                                }
                                result.push(arr);

                                // 重新
                                last = val;
                                arr = [val];
                            }
                        }

                        // 如果是最后一个数，帮上一个数判断好之后，自己也一定要形成分组了
                        if (i === max) {
                            if (last != arr[0]) {
                                arr.push(last);
                            }
                            result.push(arr);
                        }
                    });

                    obj[week] = result;
                });
                this.data2Date(obj);
            },
            // 将数据转化成对应事件
            data2Date(data) {
                Object.keys(data).forEach(week => {
                    var hours = data[week]; // 一天的多个时间段数组
                    data[week] = hours.map(hour => {
                        var begin = number2Date(hour[0] - 1);
                        var end = number2Date(hour[hour.length - 1]);
                        return [begin, end].join("~");
                    });
                });
                this.data = data;
            }
        }
    };

    function maxmin(x, y) {
        x = Number(x);
        y = Number(y);
        if (x < y) {
            return [x, y];
        } else {
            return [y, x];
        }
    }

    /* 数字转为时间，一天分成48份 */
    function number2Date(num) {
        var hour = parseInt(num / 2);
        hour = (hour > 9 ? "" : "0") + hour;
        var min = num % 2 === 1 ? "30" : "00";
        return hour + ":" + min;
    }
</script>
<style lang="less" scoped>
    #touch {
        user-select: none;
        cursor: pointer;
        p {
            display: flex;
            margin: 0;
            span {
                flex: 1 1 auto;
                width: 30px;
                height: 30px;
                background: #f0f0f0;
                border: 1px solid #ccc;
                margin: 0 -1px -1px 0;
                &.active {
                    background: #03a9f4;
                }
            }
        }
        &.add {
            .selecting {
                background: #a7f5ff;
            }
        }
        &.del {
            .selecting {
                background: #fb7e75;
            }
        }
    }
</style>

<style lang="less" scoped>
    @width: 24;
    * {
        padding: 0;
        margin: 0;
    }
    ul,
    li {
        padding: 0;
        margin: 0;
        list-style: none;
    }
    .week-picker {
        position: relative;
    }
    .calendarTraffic {
        position: absolute;
        top: 0;
        left: 0;
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    }
    .header {
        display: flex;
        line-height: 32px;
        height: 32px;
        padding: 0 10px;
        border-bottom: 1px solid #e9eaec;

        > span {
            flex: 1 1 auto;
            font-size: 12px;
            color: #495060;
            text-align: center;
            line-height: 31px;
        }
        button {
            flex: 0 0 20px;
            background: #fff;
            border: none;
            outline: none;
            cursor: pointer;
            span {
                color: #bbbec4;
                display: inline-block;
                transform: scale(0.5, 1);
                font-size: 19px;
            }
            &:hover {
                span {
                    color: #2d8cf0;
                }
            }
        }
    }

    .calendar-list {
        padding: 10px;
        text-align: center;
        font-size: 12px;
        .calendar-weekadys {
            display: flex;
            width: (@width+4) * 7px;
            .weekadys-item {
                width: @width * 1px;
                line-height: @width * 1px;
                margin: 2px;
                color: #bbbec4;
            }
        }
        .week-list {
            .week-item {
                display: flex;
                width: (@width+4) * 7px;
                border-radius: 3px;
                overflow: hidden;
                box-shadow: 0px 0px 1px 1px rgba(45, 140, 240, 0);
                transition: box-shadow 200ms;
                &:hover {
                    box-shadow: 0px 0px 1px 1px rgba(45, 140, 240, 0.5);
                    transition: box-shadow 0ms;
                }
                &.disable{
                    cursor: no-drop;
                    cursor: not-allowed;
                    &:hover {
                        box-shadow: 0px 0px 1px 1px rgba(45, 140, 240, 0);
                    }
                }
                .days-item {
                    padding: 2px;
                    color: #495060;
                    .days-item-cont {
                        width: @width * 1px;
                        line-height: @width * 1px;
                        border-radius: 3px;
                        cursor: pointer;
                        &.days-item-invalid {
                            color: #bbbec4;
                            &.active {
                                background: rgba(45, 140, 240, 0.5);
                            }
                        }
                        &.active {
                            color: #fff;
                            background: #2d8cf0;
                        }
                        &.disable {
                            background: #f7f7f7;
                            color: #bbbec4;
                            pointer-events: none;
                        }

                        &.now {
                            position: relative;
                            &:after {
                                content: "";
                                position: absolute;
                                top: 1px;
                                right: 1px;
                                width: 6px;
                                height: 6px;
                                border-radius: 50%;
                                background: #2d8cf0;
                            }
                        }
                    }
                }
            }
        }
    }
</style>

<template>
    <div class="week-picker">
        <!-- <span>{{ chosen.slice(0,1)[0] }}--{{chosen.slice(-1)[0]}}</span> -->
        <div class="calendarTraffic" name="CalendarTraffic">
            <!-- 年份/月份 流量查询-->
            <div class="header">
                <!--绑定click事件，点击按钮；重新刷新当前日期-->
                <button @click="pickPre(beginYear-1, beginMonth+1 )">
                    <span>&lt;&lt;</span>
                </button>
                <button @click="pickPre(beginYear, beginMonth)">
                    <span>&lt;</span>
                </button>
                <span>{{beginYear}}年 {{beginMonth}}月</span>
                <button @click="pickNext(beginYear,beginMonth)">
                    <span>&gt;</span>
                </button>
                <button @click="pickNext(beginYear+1,beginMonth-1)">
                    <span>&gt;&gt;</span>
                </button>
                <!-- <button @click="pickToday(beginYear,beginMonth)">今天</button> -->
            </div>
            <!-- 日历 -->
            <div class="calendar-list">
                <!-- 星期 -->
                <ul class="calendar-weekadys">
                    <li class="weekadys-item">一</li>
                    <li class="weekadys-item">二</li>
                    <li class="weekadys-item">三</li>
                    <li class="weekadys-item">四</li>
                    <li class="weekadys-item">五</li>
                    <li class="weekadys-item">六</li>
                    <li class="weekadys-item">日</li>
                </ul>
                <!-- 日期 -->
                <ul class="week-list">
                    <!-- 每个li就是一周 -->
                    <li class="week-item days-list" v-for="(days,index) in weeks" :key="index" :class="{disable:days[0].day>=limit}">
                        <div class="days-item" v-for="dayObj in days" :key="dayObj.id" >
                            <!--本月-->
                            <!--如果不是本月 改变类名加灰色-->
                            <div v-if="dayObj.day.getMonth()+1 != beginMonth" class="days-item-cont days-item-invalid" :class="{active:chosen.includes(dayObj.id),now:dayObj.id === now,disable:dayObj.day>=limit}" @click="changeMonth(dayObj)">
                                <div class="days-item-mid">
                                    <p class="days-item-item">{{ dayObj.day.getDate() }}</p>
                                </div>
                            </div>
                            <!-- 如果是本月-->
                            <div v-else class="days-item-cont days-item-normal" :class="{active:chosen.includes(dayObj.id),now:dayObj.id === now,disable:dayObj.day>=limit}" @click="pickWeeks(dayObj.id)">
                                <div class="days-item-mid">
                                    <p class="days-item-item">{{ dayObj.day.getDate() }}</p>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        props: ["syncData"],
        model: {
            prop: "syncData",
            event: "sync"
        },
        name: "CalendarTraffic",
        data() {
            return {
                limit: this.getWeekStartByMon(new Date(Date.now() - 60 * 60 * 24 * 1000)), // 限制，大于这天的将不能选择
                beginDay: 1, //这个月的1号
                beginMonth: 1, //当前月份
                beginYear: 1970, //当前年份
                beginWeek: 1, //前星期X
                chosen: [], // 选中的日期
                now: this.formatDate(new Date()),
                weeks: []
            };
        },
        created() {
            //在vue初始化时调用
            this.initData(null);
        },
        methods: {
            initData(cur) {
                let begin; // 这个月1号
                if (cur) {
                    begin = new Date(cur);
                    begin = new Date(this.formatStr(begin.getFullYear(), begin.getMonth() + 1, 1));
                } else {
                    const now = new Date();
                    // this.pickWeeks(this.formatDate(now));
                    begin = new Date(this.formatStr(now.getFullYear(), now.getMonth() + 1, 1)); // 这个月的1号
                }

                /* 这个月的年月日 */
                this.beginYear = begin.getFullYear();
                this.beginMonth = begin.getMonth() + 1;
                this.beginDay = begin.getDate();
                // console.log(this.beginYear, this.beginMonth, this.beginDay);

                /* 这个月的1号是周几 */
                this.beginWeek = begin.getDay(); //获取当前星期X(0-6,0代表星期天)
                if (this.beginWeek == 0) {
                    this.beginWeek = 7;
                }

                const str = this.formatStr(this.beginYear, this.beginMonth, this.beginDay); // 这个月1号的字符串形式
                // console.log("str", str);
                let arr = [];

                // 例今天是周五，放在第一行第5个位置，前面4个上个月的
                //初始化本周
                for (let i = this.beginWeek - 1; i >= 0; i--) {
                    const d = new Date(str);
                    d.setDate(d.getDate() - i); // 将日期设定为上个的日期
                    const dayObj = {}; //用一个对象包装Date对象 以便为以后预定功能添加属性
                    dayObj.day = d;
                    dayObj.id = this.formatDate(d);
                    arr.push(dayObj); //将日期放入data 中的days数组 供页面渲染使用
                }

                //列表显示的天数6*7减去前星期X
                let i = 1;
                while (i <= 42 - this.beginWeek) {
                    // 最大只能是42 - this.beginWeek
                    const d = new Date(str);
                    d.setDate(d.getDate() + i);

                    let month = d.getMonth() + 1;
                    let weekDay = d.getDay();
                    if (month !== this.beginMonth && weekDay === 1) {
                        // 当日期是下个月且是周一的时候，表示当前月份的日历显示不需要这一行的日期了
                        break;
                    }

                    const dayObj = {};
                    dayObj.day = d;
                    dayObj.id = this.formatDate(d);
                    arr.push(dayObj);
                    i++;
                }
                // console.log(arr);

                let week_arr = [];
                let index = 0;
                let index_index = 0;
                arr.forEach(val => {
                    if (index_index === 0) {
                        week_arr.push([]);
                    }
                    week_arr[index].push(val);
                    index_index++;
                    if (index_index === 7) {
                        index_index = 0;
                        index++;
                    }
                });
                this.weeks = week_arr;
            },
            //上个月
            pickPre(year, month) {
                // setDate(0); 上月最后一天
                // setDate(-1); 上月倒数第二天
                // setDate(dx) 参数dx为 上月最后一天的前后dx天
                const d = new Date(this.formatStr(year, month, 1));
                d.setDate(0);
                this.initData(this.formatStr(d.getFullYear(), d.getMonth() + 1, 1));
            },
            //下个月
            pickNext(year, month) {
                const d = new Date(this.formatStr(year, month, 1));
                d.setDate(32);
                this.initData(this.formatStr(d.getFullYear(), d.getMonth() + 1, 1));
            },
            // 点击非本月改变月份
            changeMonth(dayObj) {
                this.initData(this.formatStr(dayObj.day.getFullYear(), dayObj.day.getMonth() + 1, dayObj.day.getDate()));
                this.pickWeeks(dayObj.id);
            },
            //今天
            pickToday() {
                const d = new Date();
                this.initData(null);
            },
            //当前日历时间点击
            pickWeeks(dateStr) {
                var chosenArr = [];
                var chosen = new Date(dateStr);
                var weekStartByMon = this.getWeekStartByMon(chosen);
                var weekEnd = new Date(weekStartByMon.getTime() + 7 * 60 * 60 * 24 * 1000); // 以周一作为起点
                for (var i = 0; i < 7; i++) {
                    var dateStr = this.formatDate(weekStartByMon.getTime() + i * 60 * 60 * 24 * 1000);
                    chosenArr.push(dateStr);
                }
                this.chosen = chosenArr;
                this.$emit("pick");
                this.$emit("sync", [this.chosen.slice(0, 1)[0], this.chosen.slice(-1)[0]]);
            },
            getWeekStartByMon(date) {
                date = new Date(this.formatDate(date));
                var chosenWeek = date.getDay();
                if (chosenWeek == 0) {
                    chosenWeek = 7;
                }
                console.log(new Date(date.getTime() - (chosenWeek - 1) * 60 * 60 * 24 * 1000));
                return new Date(date.getTime() - (chosenWeek - 1) * 60 * 60 * 24 * 1000); // 以周一作为起点
            },
            // 格式化日期字符串
            formatStr(year, month, day) {
                let y = year;
                let m = month;
                if (m < 10) m = "0" + m;
                let d = day;
                if (d < 10) d = "0" + d;
                return y + "/" + m + "/" + d;
            },
            // 格式化日期
            formatDate(d) {
                var now;
                if (typeof d === "object") {
                    now = d;
                } else if (typeof d === "number" || typeof d === "string") {
                    now = new Date(d);
                }
                var year = now.getFullYear();
                var month = now.getMonth() + 1;
                month < 10 ? (month = "0" + month) : (month = month);
                var day = now.getDate();
                day < 10 ? (day = "0" + day) : (day = day);
                return year + "/" + month + "/" + day;
            }
        }
    };
</script>

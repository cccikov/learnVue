<template>
    <div class>
        <div class="calendarTraffic" name="CalendarTraffic">
            <!-- 年份/月份 流量查询-->
            <div class="monthHeader">
                <!--绑定click事件，点击按钮；重新刷新当前日期-->
                <button class="lf oprButton oprButton-bg ml5" @click="pickPre(beginYear, beginMonth)">❮上月</button>
                <span class="lf oprButton title-data">{{ chosen }}</span>
                <button class="lf oprButton oprButton-bg" @click="pickNext(beginYear,beginMonth)">下月❯</button>
                <button class="lf oprButton oprButton-bg ml5" @click="pickToday">今天</button>
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
                <ul class="days-list">
                    <!-- 核心 v-for循环 每一次循环用<li>标签创建一天 -->
                    <li class="days-item" v-for="dayObj in days" :key="dayObj.id" :data-key="dayObj.id">
                        <!--本月-->
                        <!--如果不是本月 改变类名加灰色-->
                        <div class="days-item-cont days-item-invalid" v-if="dayObj.day.getMonth()+1 != beginMonth" @click="changeMonth(dayObj)">
                            <div class="days-item-mid">
                                <p class="days-item-item">{{ dayObj.day.getDate() }}</p>
                            </div>
                        </div>
                        <!-- 如果是本月-->
                        <div class="days-item-cont days-item-normal" v-else :class="{active:dayObj.id === chosen,now:dayObj.id === now}" @click="pickDays(dayObj)">
                            <div class="days-item-mid">
                                <p class="days-item-item">{{ dayObj.day.getDate() }}</p>
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
        name: "CalendarTraffic",
        data() {
            return {
                beginDay: 1, //这个月的1号
                beginMonth: 1, //当前月份
                beginYear: 1970, //当前年份
                beginWeek: 1, //前星期X
                chosen: "", // 选中的日期
                now: this.formatDate(new Date()),
                days: []
            };
        },
        created() {
            //在vue初始化时调用
            this.initData(null);
        },
        methods: {
            /**
             * cur 字符串
             */
            initData(cur) {
                let begin; // 这个月1号
                if (cur) {
                    begin = new Date(cur);
                    this.chosen = this.formatDate(begin);
                    begin = new Date(this.formatStr(begin.getFullYear(), begin.getMonth() + 1, 1));
                } else {
                    const now = new Date();
                    this.chosen = this.formatDate(now);
                    begin = new Date(this.formatStr(now.getFullYear(), now.getMonth() + 1, 1)); // 这个月的1号
                }

                /* 这个月的年月日 */
                this.beginYear = begin.getFullYear();
                this.beginMonth = begin.getMonth() + 1;
                this.beginDay = begin.getDate();
                console.log(this.beginYear, this.beginMonth, this.beginDay);

                /* 这个月的1号是周几 */
                this.beginWeek = begin.getDay(); //获取当前星期X(0-6,0代表星期天)
                if (this.beginWeek == 0) {
                    this.beginWeek = 7;
                }

                const str = this.formatStr(this.beginYear, this.beginMonth, this.beginDay); // 这个月1号的字符串形式
                console.log("str", str);
                this.days.length = 0; // 清空数组

                /* 以下为核心 */
                /* 以下为核心 */
                /* 以下为核心 */

                // 例今天是周五，放在第一行第5个位置，前面4个上个月的，循环获取前几天日期
                // 初始化本周的是上个月的日
                for (let i = this.beginWeek - 1; i >= 0; i--) {
                    const d = new Date(str); // 这个月1号
                    d.setDate(d.getDate() - i); // 将日期设定为上个的日期
                    const dayObj = {}; //用一个对象包装Date对象 以便为以后预定功能添加属性
                    dayObj.day = d;
                    dayObj.id = this.formatDate(d);
                    this.days.push(dayObj); //将日期放入data 中的days数组 供页面渲染使用
                }

                // 列表显示的天数6*7减去前星期X （一个月最多31天，除以7，4行余3天，3天如果分别处于两行，最多6行）
                let i = 1;
                while (i <= 42 - this.beginWeek) {
                    // 最大只能是42 - this.beginWeek
                    const d = new Date(str);  // 这个月1号
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
                    this.days.push(dayObj);
                    i++;
                }
                console.log(this.days);
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
            },
            //今天
            pickToday() {
                const d = new Date();
                this.initData(null);
            },
            //当前日历时间点击
            pickDays(dayObj) {
                this.chosen = dayObj.id;
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
<style lang="less" scoped>
    @width: 30;
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
    .calendar-list {
        text-align: center;
        .calendar-weekadys {
            display: flex;
            width: @width * 7px;
            .weekadys-item {
                width: @width * 1px;
            }
        }
        .days-list {
            display: flex;
            flex-wrap: wrap;
            width: @width * 7px;

            .days-item {
                width: @width * 1px;
                .days-item-cont {
                    cursor: pointer;
                    &.days-item-invalid {
                        color: #eee;
                    }
                    &.active {
                        color: #fff;
                        background: #00bcd4;
                    }
                    &:hover {
                        color: #fff;
                        background: #00bcd4;
                    }
                    &.now {
                        position: relative;
                        &:after {
                            content: "";
                            position: absolute;
                            top: 2px;
                            right: 2px;
                            width: 4px;
                            height: 4px;
                            border-radius: 4px;
                            background: #f00;
                        }
                    }
                }
            }
        }
    }
</style>
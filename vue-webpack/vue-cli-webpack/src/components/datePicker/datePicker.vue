<template>
    <div class>
        <div class="calendarTraffic" name="CalendarTraffic">
            <!-- 年份/月份 流量查询-->
            <div class="monthHeader">
                <!--绑定click事件，点击按钮；重新刷新当前日期-->
                <button class="lf oprButton oprButton-bg ml5" @click="pickPre(beginYear, beginMonth)">❮上月</button>
                <span class="lf oprButton title-data">{{ nowFullYear }}/{{ nowMonth }}/{{ nowDay }}</span>
                <button class="lf oprButton oprButton-bg" @click="pickNext(beginYear,beginMonth)">下月❯</button>
                <button class="lf oprButton oprButton-bg ml5" @click="pickToday(beginYear,beginMonth)">今天</button>
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
                <ul class="calendar-days">
                    <!-- 核心 v-for循环 每一次循环用<li>标签创建一天 -->
                    <li class="days-list" v-for="(dayObj,inedx) in days" :key="dayObj.id">
                        <!--本月-->
                        <!--如果不是本月 改变类名加灰色-->
                        <div class="days-list-cont days-list-invalid" v-if="dayObj.day.getMonth()+1 != beginMonth" @click="changeMonth(dayObj.day.getFullYear(),dayObj.day.getMonth()+1,dayObj.day.getDate())">
                            <div class="days-list-mid">
                                <p class="days-list-item">{{ dayObj.day.getDate() }}</p>
                            </div>
                        </div>
                        <!-- 如果是本月-->
                        <div class="days-list-cont days-list-normal" v-else :class="{active:inedx==number}" @click="pickDays(beginYear,beginMonth,dayObj.day.getDate(),inedx)">
                            <div class="days-list-mid">
                                <p class="days-list-item">{{ dayObj.day.getDate() }}</p>
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
                number: 0, //active样式索引
                beginDay: 1, //这个月的1号
                beginMonth: 1, //当前月份
                beginYear: 1970, //当前年份
                beginWeek: 1, //前星期X
                nowFullYear: 1970, //中间显示当前年
                nowMonth: 1, //中间显示当前月
                nowDay: 1, //中间显示当前日
                days: []
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
                    begin = new Date(this.formatDate(begin.getFullYear(), begin.getMonth() + 1, 1));
                } else {
                    const now = new Date();
                    const d = new Date(this.formatDate(now.getFullYear(), now.getMonth(), 1)); // 上个月的1号 getMonth() 从0开始
                    console.log("d", d);
                    d.setDate(32);
                    begin = new Date(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1)); // 这个月的1号
                }

                /* 这个月的年月日 */
                this.beginYear = begin.getFullYear();
                this.beginMonth = begin.getMonth() + 1;
                this.beginDay = begin.getDate();
                console.log(this.beginYear, this.beginMonth, this.beginDay);

                /* 今天的年月日 */
                this.nowFullYear = begin.getFullYear();
                this.nowMonth = begin.getMonth() + 1;
                this.nowDay = new Date().getDate();
                console.log(this.nowFullYear, this.nowMonth, this.nowDay);

                /* 这个月的1号是周几 */
                this.beginWeek = begin.getDay(); //获取当前星期X(0-6,0代表星期天)
                if (this.beginWeek == 0) {
                    this.beginWeek = 7;
                }

                const str = this.formatDate(this.beginYear, this.beginMonth, this.beginDay); // 这个月1号的字符串形式
                console.log("str", str);
                this.days.length = 0; // 清空数组

                // 例今天是周五，放在第一行第5个位置，前面4个上个月的
                //初始化本周
                for (let i = this.beginWeek - 1; i >= 0; i--) {
                    const d = new Date(str);
                    d.setDate(d.getDate() - i); // 将日期设定为上个的日期
                    const dayObj = {}; //用一个对象包装Date对象 以便为以后预定功能添加属性
                    dayObj.day = d;
                    this.days.push(dayObj); //将日期放入data 中的days数组 供页面渲染使用
                }

                //this.nowDay-1（今天几号索引）this.beginWeek-1（当月第一天周几索引）
                //得到今天的索引值 初始化active样式
                this.number = this.nowDay + this.beginWeek - 2;

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
                    this.days.push(dayObj);
                    i++;
                }
            },
            //上个月
            pickPre(year, month) {
                // setDate(0); 上月最后一天
                // setDate(-1); 上月倒数第二天
                // setDate(dx) 参数dx为 上月最后一天的前后dx天
                const d = new Date(this.formatDate(year, month, 1));
                d.setDate(0);
                this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
                this.nowDay = 1;
                this.number = this.beginWeek - 1; //active样式
            },
            //下个月
            pickNext(year, month) {
                const d = new Date(this.formatDate(year, month, 1));
                d.setDate(32);
                this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
                this.nowDay = 1;
                this.number = this.beginWeek - 1; //active样式
            },
            // 点击非本月改变月份
            changeMonth(year, month, day) {
                this.initData(this.formatDate(year, month, day));
                this.nowDay = day;
                this.number = this.beginWeek - 1 + day - 1;
            },
            //今天
            pickToday(year, month) {
                const d = new Date();
                this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
            },
            //当前日历时间点击
            pickDays(year, month, clickCurrentDay, index) {
                const d = new Date();
                const day = clickCurrentDay;
                //active样式的更改
                this.number = index;
                // 年月日更改
                this.nowFullYear = year;
                this.nowMonth = month;
                this.nowDay = clickCurrentDay;
                // console.log(year,month,clickCurrentDay);
            },
            // 格式化日期
            formatDate(year, month, day) {
                let y = year;
                let m = month;
                if (m < 10) m = "0" + m;
                let d = day;
                if (d < 10) d = "0" + d;
                return y + "/" + m + "/" + d;
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
        .calendar-days {
            display: flex;
            flex-wrap: wrap;
            width: @width * 7px;

            .days-list {
                width: @width * 1px;
                .days-list-cont {
                    &.days-list-invalid {
                        color: #eee;
                    }
                    &.days-list-normal {
                        cursor: pointer;
                    }
                    &.active {
                        color: #fff;
                        background: blue;
                    }
                    &:hover {
                        color: #fff;
                        background: blue;
                    }
                }
            }
        }
    }
</style>
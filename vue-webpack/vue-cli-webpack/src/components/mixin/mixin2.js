/* 这是用于共用 */
export default {
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.from = from.name;
        })
    },
    created() {
        if (this.arr.length == 0) {
            this.arr = new Array(10).fill("").map((val, index) => {
                return index
            });
        }
        this.getDate();
    },
    data() {
        return {
            arr: [],
            index: 0,
            day1: 0,
            day7: 0,
            day30: 0,
            from: ""
        }
    },
    methods: {
        ranInt(max, min) {
            if (min > max) {
                var mid = max;
                max = min;
                min = mid;
            }
            return parseInt(Math.random() * (max + 1 - min) + min)
        },
        // 选择index
        choseIndex(val) {
            this.index = val;
        },
        insert() {
            this.arr.splice(this.index, 0, this.ranInt(11, 100000));
            this.index++;
        },
        remove() {
            if (this.arr.length == 0) {
                return
            }
            this.arr.splice(this.index, 1);
            if (this.arr.length > 0 && (this.arr.length - 1 < this.index)) {
                this.index = this.arr.length - 1
            } else if (this.arr.length == 0) {
                debugger;
                this.index = 0;
            }
        },
        exchange(posi1, posi2) {
            if (this.arr.length - 1 < posi1 || this.arr.length - 1 < posi2 || posi1 == posi2 || posi1 < 0 || posi2 < 0) {
                return false;
            }
            var mid = this.arr[posi1];
            this.$set(this.arr, posi1, this.arr[posi2]);
            this.$set(this.arr, posi2, mid);
            return true
        },
        exchangeUp() {
            if (this.exchange(this.index, this.index - 1)) {
                this.index--;
            }
        },
        exchangeDown() {
            if (this.exchange(this.index, this.index + 1)) {
                this.index++;
            }
        },
        getDate() {
            this.day1 = this.ranInt(0, 100);
            this.day7 = this.ranInt(0, 1000) + this.day1;
            this.day30 = this.ranInt(0, 10000) + this.day7;
        }
    },
    filters: {
        formatNum(num) {
            num = num.toString();
            var decimal = ""; //小数
            var integer = ""; //整数
            var point = num.indexOf(".");
            var arr = [];
            if (point != -1) {
                decimal = num.slice(point + 1);
                integer = num.slice(0, point);
            } else {
                integer = num;
                decimal = "00";
            }
            var len = integer.length;
            var n = len;
            while (n > 3) {
                n -= 3;
                arr.unshift(num.substr(n, 3));
            }
            arr.unshift(num.slice(0, n));
            return arr.join(",") + "." + decimal;
        }
    }
}
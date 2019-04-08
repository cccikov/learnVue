/* 这是用于共用 */
export default {
    methods: {
        addZero: addZero,
        // 将部分方法抽离来到了这里
        foo_1() {
            console.log("1")
        },
        foo_2() {
            console.log("2")
        },
        foo_3() {
            console.log("3")
        },
        foo_4() {
            console.log("4")
        },
        foo_5() {
            console.log("5")
        },
        foo_6() {
            this.addZero("6");
        },
        foo_7() {
            console.log("7")
        },
        foo_8() {
            this.addZero("8");
        },
        foo_9() {
            console.log("9")
        },
        foo_10() {
            console.log("10")
        },
        foo_11() {
            this.addZero("11");
        },
        foo_12() {
            this.addZero("12");
        },
    },
    filters: {
        addZero: addZero
    }
}

function addZero(num) {
    num = String(num);
    var len = num.length;
    if (len < 3) {
        return new Array(3 - len).fill("0").join("") + num;
    } else {
        return num;
    }
}
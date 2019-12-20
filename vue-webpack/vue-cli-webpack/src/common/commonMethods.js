import util from "./Util";

let methods = {
    method1() {
        console.log("方法1")
    },
    method2() {
        console.log("方法2")
    },
}

methods = Object.assign(methods, util)

export default methods

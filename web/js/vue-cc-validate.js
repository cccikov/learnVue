/**
 * Vue插件
 * by ccc
 * 2017-11-6
 */
function getArg(arg) {
    var arg, // 这个arg 应该是arguments对象
        arr = [];
    /*根据不同的参数方式 , 获取参数内容*/
    if (arg.length == 1) {
        var type = typeof arg[0];
        if (type == "object") { // (['a','b','c'])
            arr = arg[0];
        } else if (type == "string") { // ('a|b|c')
            arr = (arg[0]).split("|");
        }
    } else { // ('a','b','c')
        arr = [].slice.call(arg);
    }
    return arr;
}


var validate = {};
validate.install = function(Vue, options) {
    /* 实例属性 */
    // 增加vue实例属性,方法
    Vue.prototype.addRule = function(obj) {
        for (var i in obj) {
            this.$set(this.validate_rule, i, obj[i]);
        }
    }

    /*根据错误类型数字返回中文*/
    Vue.prototype.errorType = function(num) {
        switch (num) {
            case 0:
                return "没有错误";
            case 1:
                return "空值错误";
            case 2:
                return "正则错误";
            case 3:
                return "ajax错误";
        }

    }

    /*查看错误类型 返回数字*/
    if (!Vue.prototype.error) {
        Vue.prototype.error = function(name) {
            return this.validate_boolean[name];
        }
    } else {
        console.error("error已被声明");
    }

    /* 组合全正确 */
    if (!Vue.prototype.group) {
        Vue.prototype.group = function() {
            var arr = getArg(arguments);

            var result = arr.every(function(val) {
                return this.validate_boolean[val] == 0;
            }, this);

            return result;
        }
    } else {
        console.error("group已被声明");
    }

    /*聚焦一组验证表单中的错误元素*/
    Vue.prototype.focusErrorEl = function() {
        var arr = getArg(arguments);
        var result = arr.every(function(val) {
            var flag = (this.validate_boolean[val] == 0);
            if (!flag) {
                this.validate_el[val].focus();
            }
            return flag;
        }, this);
    }

    /* 全局混合 */
    // 任何vue实例创建的时候 , 都会自动加入下面选项
    Vue.mixin({
        data: function() {
            return {
                validate_rule: options.rules || {},
                validate_boolean: {},
                validate_el: {},
                validata_immediate: options.immediate || false, // 立即检验一次 , 适合修改 , 新增的时候一般为false ; 而且true的时候必须
            }
        }
    });

    /* 自定义指令 */
    Vue.directive("validata", {
        bind: function(_el, _binding, _vnode) {
            var el = _el; // 当前元素
            var binding_val = _binding.value.split("|"); // 指令值 需要验证的项目
            var vm = _vnode.context; // 当前vue实例
            var input_name = el.name; // 表单名
            var required = false; // 表单是否必要输入
            Vue.set(vm.validate_el, input_name, el);


            // 将 required 从需要验证的项目里面的剔除
            if (binding_val.indexOf("required") != -1) {
                var _index = binding_val.indexOf("required");
                required = true;
                binding_val.splice(_index, 1);
                Vue.set(vm.validate_boolean, input_name, null); // 也不是正确的 , 但是也没有立即报错
            } else {
                Vue.set(vm.validate_boolean, input_name, 0); // 非必要的,不填也是正确的嘛;
            }
            var field = binding_val[0]; // 获取需要验证的项目 1项

            // 事件监听器
            function handle(e) {
                var input_val = el.value; // 表单值
                var input_type = el.type; // 表单类型
                var rule = vm.validate_rule[field]; // 获取该验证项目的规则

                if (input_type == "radio" || input_type == "checkbox") {
                    if (required && !el.checked) {
                        vm.validate_boolean[input_name] = 1;
                    } else {
                        vm.validate_boolean[input_name] = 0;
                    }
                    return;
                }

                // 先判断是否符合必须输入
                if (required) { // 必填项
                    if (input_val == "") {
                        vm.validate_boolean[input_name] = 1;
                        return;
                    } else {
                        vm.validate_boolean[input_name] = 0;
                    }
                } else { // 非必填项
                    if (input_val == "") {
                        vm.validate_boolean[input_name] = 0; // 对于非必填项来说 , 空着就是正确;
                        return
                    }
                }

                if (!rule) { // 有些除了required之外没有别的了
                    return
                }

                // 判断是否符合正则
                if (!!rule.reg) {
                    var reg_result = !!input_val.match(rule.reg);
                    if (!reg_result) {
                        vm.validate_boolean[input_name] = 2;
                        return;
                    } else {
                        vm.validate_boolean[input_name] = 0;
                    }
                }

                // 最后判断ajax
                if (!!rule.ajax) {
                    $.ajax({
                        url: rule.ajax,
                        async: true,
                        success: function(result) {
                            if (!result) {
                                Vue.set(vm.validate_boolean, input_name, 3);
                            } else {
                                Vue.set(vm.validate_boolean, input_name, 0);
                            }
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                            console.error(XMLHttpRequest);
                            console.error(textStatus);
                            console.error(errorThrown);
                        }
                    });
                }
            }

            // 添加事件监听器
            if (vm.validata_immediate) {
                handle();
            }
            el.removeEventListener("blur", handle);
            el.addEventListener("blur", handle, false);
            el.removeEventListener("change", handle);
            el.addEventListener("change", handle, false);
        }
    });
}


// validate_rule 总验证规则 结构
var validate_rule = {
    "field": {
        reg: "/^0?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9])[0-9]{8}$/",
    },
    mail: {
        reg: "/^0?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9])[0-9]{8}$/"
    }
}

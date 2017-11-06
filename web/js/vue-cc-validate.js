/**
 * Vue插件
 * by ccc
 * 2017-11-6
 */
var validate = {};
validate.install = function(Vue, options) {
    /* 实例属性 */
    // 增加vue实例属性,方法
    Vue.prototype.addRule = function(obj) {
        for (var i in obj) {
            this.$set(this.validate_rule, i, obj[i]);
        }
    }
    Vue.prototype.validate = function(name) {
        return this.validate_boolean[name] || {};
    }


    /* 全局混合 */
    // 任何vue实例创建的时候 , 都会自动加入下面选项
    Vue.mixin({
        data: function() {
            return {
                validate_rule: options || {},
                validate_boolean: {}
            }
        }
    });

    /* 自定义指令 */
    Vue.directive("focus", {
        bind: function(_el, _binding, _vnode) {
            var el = _el; // 当前元素
            var binding_val = _binding.value.split("|"); // 指令值 需要验证的项目
            var vm = _vnode.context; // 当前vue实例
            var input_name = el.name; // 表单名
            Vue.set(vm.validate_boolean, input_name, {});

            // 将 required 从需要验证的项目里面的剔除
            var required = false; // 表单是否必要输入
            if (binding_val.indexOf("required") != -1) {
                var _index = binding_val.indexOf("required");
                required = true;
                binding_val.splice(_index, 1);
            }
            var field = binding_val[0]; // 获取需要验证的项目 1项




            // 事件监听器
            function handle(e) {
                var input_val = el.value; // 表单值
                var rule = vm.validate_rule[field]; // 获取该验证项目的规则

                // 先判断是否符合必须输入
                if (required && input_val == "") {
                    Vue.set(vm.validate_boolean, input_name, { required: false });
                    return;
                }

                // 判断是否符合正则
                if (!!rule.reg) {
                    var reg_result = !!input_val.match(rule.reg);
                }
                Vue.set(vm.validate_boolean, input_name, { check: reg_result });

                // 最后判断ajax
                // if (result) {
                //     fields.every(function(val) {
                //         var ajax = rules[val].ajax;
                //         if (ajax) {
                //             $.ajax({
                //                 url: "https://cccikov.github.io/remoteData/object.json",
                //                 async: true,
                //                 success: function(result) {
                //                     if (!!result) {
                //                         Vue.set(vm.validate_boolean, input_name, { ajax: true });
                //                     } else {
                //                         Vue.set(vm.validate_boolean, input_name, { ajax: false });
                //                     }
                //                 },
                //                 error: function(XMLHttpRequest, textStatus, errorThrown) {
                //                     console.error(XMLHttpRequest);
                //                     console.error(textStatus);
                //                     console.error(errorThrown);
                //                 }
                //             });
                //         }
                //     });
                // }


            }

            // 添加事件监听器
            el.addEventListener("blur", handle, false);
            // el.addEventListener("change", handle, false);
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

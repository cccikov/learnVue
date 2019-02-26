<script>
    export default {
        render(createElement) {
            /* 每次渲染都会触发 */
            // console.log(this);
            let h = createElement;
            return h(
                "div",
                {
                    class: "wrap"
                },
                [
                    checkboxAll.call(this, h, "list", "checkList"),
                    this.list.map(val => {
                        return checkbox.call(this, h, val.name, val.value, "checkList");
                    })
                ]
            );
        },
        data() {
            return {
                checkList: [],
                list: [
                    {
                        name: "ccc",
                        value: "123"
                    },
                    {
                        name: "name1",
                        value: "5234"
                    },
                    {
                        name: "name2",
                        value: "8567"
                    },
                    {
                        name: "name3",
                        value: "03485"
                    }
                ]
            };
        }
    };

    function checkboxAll(h, originListProperty, property) {
        var vm = this;
        var check = vm[property];
        var origin = vm[originListProperty];
        var checked = !!check.length && check.length == origin.length;
        return h("label", [
            h("input", {
                attrs: {
                    type: "checkbox"
                },
                domProps: {
                    name: "checkboxAll",
                    value: "all",
                    checked: checked
                },
                on: {
                    change(e) {
                        var _this = e.currentTarget;
                        if (_this.checked) {
                            vm[property] = origin.map(val => {
                                return val.value;
                            });
                        } else {
                            vm[property] = [];
                        }
                    }
                }
            }),
            h("span", "全选")
        ]);
    }

    function checkbox(h, name, value, property) {
        var vm = this;
        var list = vm[property];
        var checked = vm[property].includes(value);
        return h("label", [
            h("input", {
                attrs: {
                    type: "checkbox"
                },
                domProps: {
                    name: name,
                    value: value,
                    checked
                },
                on: {
                    change(e) {
                        var _this = e.currentTarget;

                        if (_this.checked) {
                            if (!list.includes(_this.value)) {
                                list.push(_this.value);
                            }
                        } else {
                            let index = list.indexOf(_this.value);
                            if (index != -1) {
                                list.splice(index, 1);
                            }
                        }
                        console.log(list);
                    }
                }
            }),
            h("span", name)
        ]);
    }
</script>


<style lang='less'>
    label {
        display: block;
        line-height: 2;
    }
</style>
